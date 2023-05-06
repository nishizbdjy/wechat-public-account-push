import axios from 'axios'
import de from './de.min.js'
const deFc = new de()
//创建Web服务器
// const app = express()
//调用app.listen(端口号, 启动成功后的回调函数)，启动服务器
// app.listen(9055, (err) => {
//     console.log('express server running at http://127.0.0.1');
// })
//发送订阅消息
// app.get('/book/sendMessage', async function (req, res) {
/*处理函数*/
// console.log(req);
// console.log(res);
export const sendApplet = async function () {
    const imgAxios = axios.create({
        baseURL: 'https://img.lkxin.cn/api/v1',
        timeout: 30000,
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer 94|xKMNt9mU6eJm9nNC2zgXTmQXTO4Ca5WFv2UaGQkr`,
        }
    })
    const getAppData = () => {
        return new Promise(async (resolve, rej) => {
            try {
                let res = await imgAxios.get('/albums');
                const { status, data, statusText } = res;
                if (status == 200 && statusText == 'OK') {
                    let imagesId = data.data.data.find(v => v.name == 'bookpush').id;
                    let tokenId = data.data.data.find(v => v.name == 'userAccountBook').id;
                    let imgs = await imgAxios.get('/images', {
                        params: {
                            permission: 'private',
                            album_id: imagesId,
                        }
                    })
                    if (imgs.status == 200 && imgs.statusText == 'OK') {
                        let pushData = [];
                        if (imgs.data.data.data.length == 0) return resolve({ list: [] })
                        imgs.data.data.data.forEach((v, i) => {
                            axios.get('https://cli.im/Api/Browser/deqr?data=' + v.links.url).then(res => {
                                if (res.status == 200 && res.statusText == 'OK') {
                                    res.data.status == 1 && pushData.push(JSON.parse(res.data.data.RawData))
                                    if (i == imgs.data.data.data.length - 1) resolve({ list: pushData, id: tokenId })
                                } else rej('读取图片失败')
                            }).catch(err => rej(err))
                        })
                    } else { rej('请求推送信息失败') };
                } else { rej('请求相册失败') };
            } catch (err) {
                return new Error(err)
            }
        })
    }
    const readImgData = (url) => {
        return new Promise((resolve, rej) => {
            axios.get('https://cli.im/Api/Browser/deqr?data=' + url).then(res => {
                if (res.status == 200 && res.statusText == 'OK') {
                    res.data.status == 1 && resolve(res.data.data.RawData)
                } else rej('读取图片失败' + url)
            }).catch(err => rej(err))
        })
    }
    const getwxToken = (tokenId) => {
        return new Promise(async (resolve, rej) => {
            let imgs = await imgAxios.get('/images', {
                params: {
                    permission: 'private',
                    album_id: tokenId,
                    q: 'img_login'
                }
            })
            if (imgs.status == 200 && imgs.statusText == 'OK') {
                let appid, secret = '';
                imgs.data.data.data.forEach(v => {
                    if (v.origin_name.includes('appid_img')) appid = v.links.url
                    if (v.origin_name.includes('secret_img')) secret = v.links.url
                })
                if (appid == '' || secret == '') return rej('登录失败');
                Promise.all([readImgData(secret), readImgData(appid)])
                    .then(res => {
                        let keys = []
                        res.forEach(v => {
                            keys.push(v.split('?')[1])
                        })
                        const tokenSecret = deFc.decode(keys[0])
                        const tokenAppid = deFc.decode(keys[1])
                        console.clear()
                        axios.get('https://api.weixin.qq.com/cgi-bin/token', {
                            params: {
                                grant_type: 'client_credential',
                                appid: tokenAppid,
                                secret: tokenSecret
                            }
                        }).then(result => {
                            if (result.status == 200 && result.statusText == 'OK' && result.data.access_token) {
                                resolve(result.data)
                            } else rej('登录失败:wx')
                        }).catch(rej)
                    }).catch(err => rej(err))
            } else rej('登录失败')
        })
    }
    const wxSend = (data) => {
        return new Promise((resolve, reject) => {
            axios.post('https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=' + data.access_token, {
                ...data
            }).then(res => {
                console.log();
                if (res.status == 200 && res.statusText == 'OK' && res.data.errmsg == 'ok') {
                    resolve(res.data)
                } else reject(res.errmsg)
            }).catch(reject)
        })
    }
    try {
        let { list, id } = await getAppData();
        console.log(list);
        if (list.length == 0) {
            //  return res.send({
            //      code: 0,
            //      msg: '暂无需要推送用户'
            //  })
            return console.log('暂无需要推送用户小程序');
        }
        const { access_token } = await getwxToken(id);
        list.forEach(v => {
            wxSend({
                access_token,
                template_id: v.templateId,
                page: '/pages/book/index',
                touser: v.openId,
                data: {
                    thing1: { value: v.pushType },
                    time2: { value: v.date },
                    amount3: { value: v.amount },
                    thing4: { value: v.remark }
                },
            })
        })
        //         res.send({ code: 0 })
        console.log('小程序推送成功');
    } catch (e) {
        console.log(e);
        //         res.send({ code: 100, msg: e })
    }
    // })
}

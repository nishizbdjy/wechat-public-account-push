import axios from 'axios'
import de from './de.min.js'
import md5 from 'md5-js'
import dayjs from 'dayjs';
const deFc = new de();
const requestData = (data, model_name) => {
    data.return_data = 1
    data.model_name = model_name
    data.timestamp = Date.now();
    data.app_key = '2E3E94CE384AD34FA70580884D9BC1DA';
    let names = Object.keys(data)
    let sortData = new Object()
    names.sort()
    names.forEach(v => {
        sortData[v] = data[v]
    })
    data = sortData
    let strData = ''
    for (let key in data) {
        strData += `${data[key]}`
    }
    strData += 'fzvCv7C7I60G2sdHlvyRUseuub2vIWIvDg3ELQksdg1a30UL84ySxrgGqu'
    data.sign = md5(strData).toUpperCase()
    return data
}
export const sendApplet = async function () {
    const getUserData = () => {
        return new Promise((res1, rej1) => {
            axios.post(
                'https://hn216.api.yesapi.cn/api/App/Table/GetMoreDataByMoreField',
                requestData({
                    field_value_list: `no,${dayjs().format('YYYY.MM.DD')}`,
                    field_name_list: 'is_settle,return_end_date',
                }, 'debt_table')
            ).then(res => {
                if (res.status == 200 && res.data.err_code == 0) {
                    return res1(res.data.items)
                } else rej1('获取数据失败')
            }).catch(err => {
                rej1(err)
            })
        })
    }
    const getwxToken = () => {
        return new Promise(async (resolve, rej) => {
            axios.get('https://api.weixin.qq.com/cgi-bin/token', {
                params: {
                    grant_type: 'client_credential',
                    appid: deFc.decode('TzREd0RBeGc3QUpnWm1BUmxBTEFOZ0tiSUp3Rlk1QQ=='),
                    secret: deFc.decode('S1lWZ3pBWmdqQWhnVEFJd0d3QTRuQlRCSVVCTm13QU1BTEFNWVRBUUthRkE')
                }
            }).then(result => {
                if (result.status == 200 && result.statusText == 'OK' && result.data.access_token) {
                    resolve(result.data)
                } else rej('登录失败:wx')
            }).catch(rej)
        })
    }
    const wxSend = (data) => {
        return new Promise((resolve, reject) => {
            axios.post('https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=' + data.access_token, {
                ...data
            }).then(res => {
                if (res.status == 200 && res.statusText == 'OK' && res.data.errmsg == 'ok') {
                    resolve(res.data)
                } else reject(res.errmsg)
            }).catch(reject)
        })
    }
    try {
        let list = await getUserData();
        if (list.length == 0) {
            return console.log('暂无需要推送用户小程序');
        }
        const { access_token } = await getwxToken();
        list.forEach(v => {
            let data = JSON.parse(deFc.decode(v.iou_data))
            wxSend({
                access_token,
                // template_id: v.templateId,
                template_id: 'Rw9RPHmds2496OIElwal6mcasLNWRFtkqedkYtNuJPk',
                page: '/pages/book/index',
                touser: v.borrower_id,
                data: {
                    thing1: { value: '今日待还款通知' },
                    time2: { value: dayjs().format('YYYY年M月D日') },
                    amount3: { value: Number(data.borrowingSum) - Number(v.paid_debt) + '元' },
                    thing4: { value: `今日待还款给「${data.lender}」，请及时还款` }
                },
            })
        })
        console.log('小程序推送成功');
    } catch (e) {
        console.log(e);
    }
}

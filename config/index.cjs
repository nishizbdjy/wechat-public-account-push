/* eslint-disable */

/**
 * 此项目配置为方便新人使用，已缩减至最简配置。
 * 如若想使用更多功能，请查考文档中的 【3. config参数说明】 
 * 自行添加属性，以支持更多个性化功能
 */
const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')
dayjs.extend(utc)
const beiHour = dayjs.utc().add(8, 'hour').hour()
const CONFIG = {
  DEAR: {
    // 想要发送的人的名字
    name: '宝贝',
    city: '广东',
    province: '广州',
    horoscopeDateType: '今日',
    openUrl: 'https://wangxinleo.cn',
    // 使用微信测试号：扫码关注你的微信测试号后生成的一段字符串，在测试号后台能看到
    id: 'oW5Ng59tm6PvRcsuR-FevZLdQuQA',
    // 使用微信测试号：你想对他发送的模板消息的模板ID
    useTemplateId: beiHour > 12 ? 'VjbAYC1y0W2fKYz2YUp3Sh6PMlG_6kxycExoA-OMWAM' : 'hZsh_AQXiLMgroERGyGXu-Wc9mzv5n-EysrnybaLE10',
    // 新历生日, 仅用作获取星座运势, 格式必须为MM-DD
    horoscopeDate: '06-13',
    festivals: [
      // 注意：此条配置日期为阴历日期，因为`type`中 “生日” 之前有 * 符号
      // {
      //   type: '*生日', name: '小魏', year: '2000', date: '06-13',
      // },
      // {
      //   type: '*生日', name: '超文', year: '2001', date: '09-18',
      // },
      // 注意：此条配置日期为阳历日期，因为`type`中 “生日” 之前没有 * 符号
      {
        type: '节日', name: '母亲节', year: '2023', date: '05-14',
      },
      {
        type: '节日', name: '父亲节', year: '2023', date: '06-18',
      },
      // {
      //   type: '节日', name: '相识纪念日', year: '2020', date: '09-03',
      // },
    ],
    // 我们在一起已经有xxxx天了的配置
    customizedDateList: [
      // 在一起的日子
      // { keyword: 'love_day', date: '2022-09-08' },
      // // 结婚纪念日
      // { keyword: 'marry_day', date: '2022-09-09' },
    ],
  },
  BUDDY: {
    name: '星哥',
    city: '广东',
    province: '深圳',
    horoscopeDateType: '今日',
    openUrl: 'https://wangxinleo.cn',
    id: 'oW5Ng53KEU-wGMBHZ8P86UYG1zKE',
    useTemplateId: beiHour > 12 ? 'jzf73B9qAQWnfz0Dxb8p_HVAjRFP52zJnhzbI8cOxlc' : 'e6KowXbDBUhucEXkgOJbAHY9qARrV56TNSxw3wMACco',
    horoscopeDate: '04-04',
    festivals: [
      {
        type: '节日', name: '母亲节', year: '2023', date: '05-14',
      },
      {
        type: '节日', name: '父亲节', year: '2023', date: '06-18',
      },
    ],
    customizedDateList: [
      // { keyword: 'marry_day', date: '2022-09-09' },
    ],
  },
  FAMILY: {
    name: '老妈',
    city: '广东',
    province: '东莞',
    horoscopeDateType: '今日',
    openUrl: 'https://wangxinleo.cn',
    id: 'oW5Ng53YtrG1vWumDLRczcQhAMkM',
    useTemplateId: beiHour > 12 ? 'rEFGIWG4WfSVbnhu4l9mf4w-STig0d0djW3Z0Oix0t0' : '2CnxPvopaQ341GWDnU-xfw1mfNu3RV_cz7Px6uF3iBI',
    horoscopeDate: '08-07',
    festivals: [
    ],
    customizedDateList: [
    ],
  }
}
const changeConfigUser = (obj, config = {}) => {
  let object = JSON.parse(JSON.stringify(obj))
  for (const key in config) {
    object[key] = config[key] ? config[key] : object[key]
  }
  return object
}
const USER_CONFIG = {

  // 使用微信测试号：公众号APP_ID
  APP_ID: 'wx43bd0b34ccbe7cd2',

  // 使用微信测试号：公众号APP_SECRET
  APP_SECRET: '5f1177532b6ef66226b67e6d0932d7ed',

  PROVINCE: '广东',
  CITY: '广州',

  USERS: [
    // CONFIG.DEAR,
    changeConfigUser(CONFIG.DEAR, {
      name: '超文', id: 'oW5Ng50UY3tRcB3Z4UzmJFDgo2wM'
    }),
    CONFIG.BUDDY,
    changeConfigUser(CONFIG.BUDDY, { name: '菊香', id: 'oW5Ng5_ThvYsRVNI3whvx1oblpio' }),
    changeConfigUser(CONFIG.BUDDY, {
      name: '国超', id: 'oW5Ng52p5xm_briOmYWyVRb3EBtU', city: '北京',
      province: '北京',
    }),
    changeConfigUser(CONFIG.BUDDY, {
      name: '龙哥', id: 'oW5Ng56r0zks5yFbK12T__P7pdEg'
    }),
    CONFIG.FAMILY,
    changeConfigUser(CONFIG.FAMILY, {
      name: '老爸', id: 'oW5Ng55Ygjaq-smt7_NmVJWQErRQ'
    }),
  ],


  // 【推送完成提醒】模板id, 用来看自己有没有发送成功的那个模板
  CALLBACK_TEMPLATE_ID: 'efDiuzsOxC1YvJhOy_wqo6lZfz-xtqYXw8TpYQ_m0Nk',

  CALLBACK_USERS: [
    {
      name: '自己',
      // 使用微信测试号：自己的微信id，扫码关注你的微信测试号后生成的一段字符串，在测试号后台能看到
      id: 'oW5Ng50UY3tRcB3Z4UzmJFDgo2wM',
    }
  ],
  // 功能开关,打开：true，关闭：false
  SWITCH: {
    /** 每日天气 */
    // 填 false 则不使用，按需关闭不使用的功能可以提高运行速度
    weather: true,
    /** 节假日 */
    // 下一休息日综合提醒, 填 false 则不使用，按需关闭不使用的功能可以提高运行速度
    holidaytts: true,
    /** 每日N句 */
    // 金山每日一句, 填 false 则不使用，按需关闭不使用的功能可以提高运行速度
    CIBA: true,
    // 每日一言, 填 false 则不使用，按需关闭不使用的功能可以提高运行速度
    oneTalk: false,
    // 土味情话(彩虹屁), 填 false 则不使用，按需关闭不使用的功能可以提高运行速度
    earthyLoveWords: true,
    // 朋友圈文案, 填 false 则不使用，按需关闭不使用的功能可以提高运行速度
    momentCopyrighting: true,
    // 毒鸡汤, 填 false 则不使用，按需关闭不使用的功能可以提高运行速度
    poisonChickenSoup: true,
    // 古诗古文, 填 false 则不使用，按需关闭不使用的功能可以提高运行速度
    poetry: false,
    /** 星座运势 */
    // 填 false 则不使用，按需关闭不使用的功能可以提高运行速度
    horoscope: true,
    /** 生日消息和节日消息 */
    // 填 false 则不使用，按需关闭不使用的功能可以提高运行速度
    birthdayMessage: true,
    /** 学生课表 */
    // 填 false 则不使用，按需关闭不使用的功能可以提高运行速度
    courseSchedule: false,
  },
}

/*
------------------------------[宝贝！]

午安，{{to_name.DATA}}
日期🗓️：{{date.DATA}}
城市🏘️：{{province.DATA}}
天气☀️：{{weather.DATA}}
最低气温🧊：{{min_temperature.DATA}}℃
最高气温🌡️：{{max_temperature.DATA}}℃
温馨提示☁️：{{notice.DATA}}
💌 {{moment_copyrighting.DATA}}
🎮 {{holidaytts.DATA}}
🕒 {{birthday_message.DATA}}


❤️ {{earthy_love_words.DATA}}
------------------------------[铁汁！]

午安，{{to_name.DATA}}
日期🗓️：{{date.DATA}}
城市🏘️：{{province.DATA}}
天气☀️：{{weather.DATA}}
最低气温🧊：{{min_temperature.DATA}}℃
最高气温🌡️：{{max_temperature.DATA}}℃
温馨提示☁️：{{notice.DATA}}
💌 {{moment_copyrighting.DATA}}
💪 {{poison_chicken_soup.DATA}}
🎮 {{holidaytts.DATA}}
🕒 {{birthday_message.DATA}}


🌈 {{note_en.DATA}}
🚀 {{note_ch.DATA}}
------------------------------[家人！]
午安，{{to_name.DATA}}
日期🗓️：{{date.DATA}}
城市🏘️：{{province.DATA}}
天气☀️：{{weather.DATA}}
最低气温🧊：{{min_temperature.DATA}}℃
最高气温🌡️：{{max_temperature.DATA}}℃
温馨提示☁️：{{notice.DATA}}
注意身体👚：{{ganmao.DATA}}
🕒 {{birthday_message.DATA}}


💌 {{moment_copyrighting.DATA}}
🌸 {{comprehensive_horoscope.DATA}}
------------------------------[打工人！]
午安，{{to_name.DATA}}
日期🗓️：{{date.DATA}}
城市🏘️：{{province.DATA}}
天气☀️：{{weather.DATA}}
最低气温🧊：{{min_temperature.DATA}}℃
最高气温🌡️：{{max_temperature.DATA}}℃
温馨提示☁️：{{notice.DATA}}
🌸 {{comprehensive_horoscope.DATA}}


💪 {{poison_chicken_soup.DATA}}
*/
module.exports = USER_CONFIG

import Mock from "mockjs";
// Mock.mock("/api/banner", "get", {
//   code: 0,
//   msg: "",
//   data: [{
//       midImg: "https://img1.baidu.com/it/u=2716398045,2043787292&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800",
//       bigImg: "https://img1.baidu.com/it/u=793269991,2224346596&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
//       title: "凛冬将至",
//       description: "人唯有恐惧的时候方能勇敢",
//       id: "6090af0a9dcd41a467fb4cae",
//     },
//     {
//       midImg: "https://img1.baidu.com/it/u=2839692202,2605797378&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=498",
//       bigImg: "https://img2.baidu.com/it/u=1347252749,346830019&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
//       title: "血火同源",
//       description: "如果我回头，一切都完了",
//       id: "6090af0a9dcd41a467fb4caf",
//     },
//     {
//       midImg: "https://img0.baidu.com/it/u=3794879963,319104949&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
//       bigImg: "https://img1.baidu.com/it/u=1487886557,3317274354&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
//       title: "听我怒吼",
//       description: "兰尼斯特有债必偿",
//       id: "6090af0a9dcd41a467fb4cb0",
//     },
//   ],
// });

// Mock.mock("/api/blog?page=1&limit=10", "get", {
//   code: 0,
//   msg: "",
//   data: [{
//       id: "608cc9903cddc5584a708c46",
//       title: "vue 响应式原理",
//       description: "vue通过Object.defineProperty，将对象的属性变成getter和setter，当运行getter时记录依赖，当运行setter时派发更新",
//       createDate: 1619941606475,
//       scanNumber: 10,
//       commentNumber: 10,
//       category: {
//         id: "60852e6c3587f282fd5c5e80",
//         name: "vue"
//       },
//       toc: [{
//           name: "章节 1",
//           anchor: "title-1"
//         },
//         {
//           name: " 章节 2",
//           anchor: "title-2",
//           children: [{
//               name: " 章节 2-1",
//               anchor: "title-2-1"
//             },
//             {
//               name: " 章节 2-2",
//               anchor: "title-2-2"
//             },
//           ],
//         },
//       ],
//       thumb: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201710%2F25%2F20171025180020_MVxEz.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1650789187&t=4b90be172b2adc5639202f123b14f779",
//     },
//     {
//       id: "608cc9903cddc5584a708c46",
//       title: "英锅锅牛逼",
//       description: "回娘家大V你们给大家发看看",
//       createDate: 1619941999999,
//       scanNumber: 1045,
//       commentNumber: 109,
//       category: {
//         id: "60852e6c3587f282fd5c5e80",
//         name: "HTML"
//       },
//       toc: [{
//           name: "章节 1",
//           anchor: "title-1"
//         },
//         {
//           name: " 章节 2",
//           anchor: "title-2",
//           children: [{
//               name: " 章节 2-1",
//               anchor: "title-2-1"
//             },
//             {
//               name: " 章节 2-2",
//               anchor: "title-2-2"
//             },
//           ],
//         },
//       ],
//       thumb: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2Ffa%2F06%2Fce%2Ffa06ce964ff8b26ce0e2fc55831b2c3d.jpeg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1650789170&t=4dc771ae2dc96e6ac37380a13106b65c",
//     },
//     {
//       id: "608cc9903cddc5584a709c46",
//       title: "钢铁是怎样练成的",
//       description: "俄罗斯作家某某编写的书籍",
//       createDate: 1619941609999,
//       scanNumber: 100,
//       commentNumber: 105,
//       category: {
//         id: "60852e6c3587f28bhjkn00e80",
//         name: "JS"
//       },
//       toc: [{
//           name: "章节 1",
//           anchor: "title-1"
//         },
//         {
//           name: " 章节 2",
//           anchor: "title-2",
//           children: [{
//               name: " 章节 2-1",
//               anchor: "title-2-1"
//             },
//             {
//               name: " 章节 2-2",
//               anchor: "title-2-2"
//             },
//           ],
//         },
//       ],
//       thumb: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202104%2F21%2F20210421103110_3f21b.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1650789153&t=b5625b82a2e4921bbdecdac8cb682640",
//     },
//   ],
// });

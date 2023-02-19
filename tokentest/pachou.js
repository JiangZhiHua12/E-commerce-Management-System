//import LoginView from "../tokenvue/src/views/LoginView";

const fs = require ('fs')
const puppeteer = require('puppeteer');


(async () => {
    //puppeteer.launch实例开启浏览器//并且可以传入一个对象，可以配置有界面浏览器和无界面浏览器//无界面浏览器的性能最好，有界面用于调试
    //browser是实例化的一个浏览器对象
    //配置browser
    var option={
        defaultViewport:{   //配置浏览器的窗口大小
            width:1550,
            height:800
        },
        headless:false//此配置是关闭无头页面
    }
    const browser = await puppeteer.launch(option);
    //浏览器打开一个新页面,并返回一个页面的对象
    const page = await browser.newPage();
    //配置访问的页面
    await page.goto('https://www.jd.com');
    //访问成功之后可以对这个页面进行一些操作例如截屏
   // await page.screenshot({path: 'screenshot.png'});
    //获取页面内容
    //#app #J_app #J_feeds .more2 div[class='grid_c1 more2_inner'] div ul li
    //#feedContent0 > li:nth-child(1)
    /*elements.forEach(item=>{
                item.innerHTML
                console.log(item)
        console.log('haha')
    })*/

    //拿到商品的图片
    async function getPrice() {
        var result2=await page.$$eval("#feedContent0 .more2_item.more2_item_good.hover-on a .more2_info .more2_info_price.more2_info_price_plus.more2_info_price_newcomer .mod_price .more2_info_price_txt  ",elements => {
            var price=null
            elements.forEach(item=>{
                console.log(item.innerText)
                price=item.innerText
            })
            return price
        })
        return result2
    }
    var price=await getPrice()
    console.log(price)
    async function getImg() {
        var result=await page.$$eval("#feedContent0 .more2_item.more2_item_good.hover-on a .lazyimg.lazyimg_loaded.more2_img img  ",elements => {
            var Obj=[]
            elements.forEach( async item=>{
                console.log(item.getAttribute('src'))
                var price=await getPrice()
                console.log(price)
                Obj.push({
                    src:item.getAttribute('src'),
                    title:item.getAttribute('alt'),
                    price:price
                })

            })
            return Obj
        })
    }

    var img=await getImg()

    console.log(img)



      //var price=await getPrice()
    //console.log(price)










    //console.log('hahha')
    //console.log(result2)

    //var res = JSON.stringify(result)
    /*
    var data=JSON.stringify(result)

              fs.writeFile('Product2.json',data,err => {
                  if (err){
                      return err
                  }
                  console.log('数据写入成功')
              })*/



})();
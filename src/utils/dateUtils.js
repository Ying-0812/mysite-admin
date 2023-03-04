export function formDate(thumb){
    var date = new Date(thumb)
    var year = date.getFullYear()
    var month = (date.getMonth() + 1).toString().padStart(2,'0')
    var day = date.getDate().toString().padStart(2,'0')
    var hour = date.getHours().toString().padStart(2,'0')
    var minute = date.getMinutes().toString().padStart(2,'0')
    var seconds = date.getSeconds().toString().padStart(2,'0')
    var arr = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"]
    var week = arr[date.getDay()]
    return year +'-'+ month +'-'+ day +' '+ hour +':'+ minute +':'+ seconds +' '+ week
}
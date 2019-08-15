
//电影评分
function moviestar(stars) {
  var num = stars.toString().substring(0, 1);
  var arr = []
  for (var i = 0; i < 5; i++) {
    if (i < num) {
      arr.push(1)
    } else {
      arr.push(0)
    }
  }
  return arr
}
//演员图片 姓名
function cancatImg(casts){
  var castsArray=[]
  for(var idx in  casts){
    var cast={
      img: casts[idx].avatars ? casts[idx].avatars.large:'',
      name:casts[idx].name
    }
    castsArray.push(cast)
  }
return castsArray
}
//姓名拼接
function castsname(casts){
  var castsname=""
  for(var idx in casts){
    castsname = castsname+casts[idx].name + "/"
  }
  return castsname.substring(0,castsname.length-1)
}
//导演姓名
function ondirectors(casts){
  var castsArray = ""
  for (var idx in casts) {
    
      // avatars: casts[idx].avatars ? casts[idx].avatars.large : '',
    castsArray = castsArray+ casts[idx].name+","
     
  }
  return castsArray.substring(0, castsArray.length-1)
}
module.exports = {
  moviestar: moviestar,
  cancatImg: cancatImg,
  castsname: castsname,
  ondirectors: ondirectors
}
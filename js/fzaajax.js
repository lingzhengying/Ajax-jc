function resolveData(data){
    let arr = [];
    for(let k in data){
        let str = k + '=' + data[k]
        arr.push(str)
    }
    return arr.join('&');
}

function itheima(options){
    let xhr = new XMLHttpRequest();
    
    // 把外界传递过来的参数对象 转化为 查询字符串
    let qs = resolveData(options.data)

    if(options.method.toUpperCase() === 'GET'){
        // 发起get请求 请求方式 options.method  请求url：options.url
        xhr.open(options.method, options.url + '?' + qs);
        xhr.send();
    } else if (options.method.toUpperCase() === 'POST'){
        // 发起post请求
        xhr.open(options.method, options.url);
        // setRequestHeader 设置 HTTP 请求头的值
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        xhr.send(qs);
    }

    // 当请求被发送到服务器时，我们需要执行一些基于响应的任务。 每当readyState 改变时，就会触发onreadystatechange 事件
    xhr.onreadystatechange = function(){
        // readyState 返回一个XMLHttpRequest 代理当前所处的状态
        if(xhr.readyState === 4 && xhr.status === 200){
            let result = JSON.parse(xhr.responseText);
            // success 回调函数
            options.success(result);
        }
    }
}
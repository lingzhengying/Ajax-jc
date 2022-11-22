function getCommentList(){
    $.ajax({
        method:'get',
        url:'http://www.liulongbin.top:3006/api/cmtlist',
        success: function(res){
          if(res.status !== 200) return alert('获取评论列表失败')
          var rows=[];
          $.each(res.data,function(i,item){
            var str =' <li class="list-group-item"><span class="badge" style="background-color: #F0ad4E;">评论时间:' + item.time + '</span><span class="badge" style="background-color: #58c0DE;">评论人:' + item.username + '</span>' + item.content + '</li>'
         rows.push(str);
        })
        $('#cmt-list').empty().append(rows.join(''))
      }
    })
}
getCommentList()

$(function(){
    $('#formAddCmt').submit(function(e){
      //preventDefault 阻止表单默认行为
        e.preventDefault();
         //serialize  获取表单中的数据
        var data = $(this).serialize()
        $.post('http://www.liulongbin.top:3006/api/addcmt',data,
        function(res){
          // 查看数据是否获取成功
          if(res.status !== 201){
            return alert('发表评论失败')
          } else {
            // 重新刷新列表
            getCommentList();
            // 重置from表单
            $('#formAddCmt')[0].rset()
          }
        })
    })
})
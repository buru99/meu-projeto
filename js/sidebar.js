document.getElementById('open_btn').addEventListener('click', function(){
    document.getElementById('sidebar').classList.toggle('open-sidebar')
});

document.getElementById('open-list').addEventListener('click', function() {
    document.getElementById('list').classList.toggle('hidden')
    document.getElementById('list-btn').classList.toggle('rotate-90')
});


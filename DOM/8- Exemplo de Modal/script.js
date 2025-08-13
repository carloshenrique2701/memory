document.getElementById('openModal').addEventListener('click', function() {
    
    var modal = document.getElementById('modal');

    modal.style.display =  'block';


});


document.getElementById('closeModal').addEventListener('click', function() {
    
    document.getElementById('modal').style.display = 'none';

})

window.onclick = function(event) {

    if(event.target === document.getElementById('modal')){

        document.getElementById('modal').style.display = 'none'

    }
    
}
// document dom loaded
document.addEventListener('DOMContentLoaded', function() {

    document.querySelector('main > section.showcase').style.display = 'flex';
    document.querySelector('.navbar__menu ul li a').classList.add('active');

    Array
        .from(document.querySelectorAll('.navbar__menu ul li a'))
        .forEach( btn => btn.addEventListener('click', function() {
            Array
                .from(document.querySelectorAll('main > section.showcase'))
                .forEach( section => section.style.display = 'none' );

            Array
                .from(document.querySelectorAll('.navbar__menu ul li a'))
                .forEach( btn => btn.classList.remove('active') );

            btn.classList.add('active');

            document.querySelector('main > section.showcase--' + btn.dataset.category).style.display = 'flex';
        }))

});

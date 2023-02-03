// Car mark selector

let indicator = document.querySelector('.indicator').children;
let li = document.querySelector('.items').children;

for (let i of li)
{
    const name = i.querySelector('.mark');
    const x = name.textContent;
    i.setAttribute('data-category', x);
}

for (let i = 0; i<indicator.length; i++) 
{
    indicator[i].onclick = function(){
        for(let x=0; x<indicator.length; x++)
        {
            indicator[x].classList.remove('active');
        }
        this.classList.add('active');
        const displayItems = this.getAttribute('data-filter');

        for (let z = 0; z<li.length; z++)
        {
            li[z].style.transform = 'scale(0)';
            setTimeout(()=>{
                li[z].style.display = 'none';
            }, 500);
            if ((li[z].getAttribute('data-category') == displayItems) || displayItems == 'all') {
                li[z].style.transform = 'scale(1)';
                setTimeout(()=>{
                    li[z].style.display = 'block';
                }, 500);
            }
        }
    }
}

// Car price filter 

let field = document.querySelector('.items');
let item = Array.from(field.children);
let select = document.getElementById('select');
let ar = [];

for (let i of item)
{
    const last = i.lastElementChild;
    const x = last.textContent.trim();
    const y = Number(x.substring(1));
    i.setAttribute('data-price', y);
    ar.push(i);
}

select.onchange = sortingValue;

function sortingValue() 
{
    if (this.value === 'Default')
    {
        while(field.firstChild)
        {
            field.removeChild(field.firstChild);
        }
        field.append(...ar);
    }

    if (this.value === 'LowToHigh') 
    {
        sortElem(field, item, true);
    }

    if (this.value === 'HighToLow') 
    {
        sortElem(field, item, false);
    }
}


// function sort
function sortElem(field, item, asc)
{
    let dm, sortLi;
    dm = asc ? 1 : -1;
    sortLi = item.sort((a,b)=>{
        const ax = a.getAttribute('data-price');
        const bx = b.getAttribute('data-price');

        return ax > bx ? (1*dm) : (-1*dm);
    })
    while(field.firstChild)
    {
        field.removeChild(field.firstChild);
    }
    field.append(...sortLi);
}
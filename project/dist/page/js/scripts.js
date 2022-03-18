
// 우클릭 및 개발자도구 차단
const warning = `해당 동작을 사용할 수 없습니다. 이 사이트는 사이트 제작자 및 작업물 소유자와의 협의 없는 소스 열람 및 복사를 금지하고 있습니다.`;
document.onmousedown=click;
document.onkeydown=click;
function click(e) {
  if (e.keyCode == 123 || e.which == 123) {
    e.preventDefault();
    console.log(warning);
    alert(warning);
  }
}
window.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  alert(warning);
}, false);

// 드래그 차단
var vformtags = ["select", "input", "textarea"];
vformtags = vformtags.join("|");
disableSelect = (e) => {if (vformtags.indexOf(e.target.tagName.toLowerCase())==-1) {return false;}}
enableSelect = () => {return true;}
typeof document.onselectstart!="undefined" ? document.onselectstart=new Function ("return false") : document.onmousedown=disableSelect; document.onmouseup=enableSelect;

// intro toggle UX
window.addEventListener('DOMContentLoaded', (e) => {
  const main = document.querySelector('.main.unintroduced');
  const toggle = document.querySelector('#intro');
  if (main) {
    toggle.style.top = 0;
    toggle.style.opacity = 1;
    toggle.style.transform = "scale(1) skew(0, 0)";
    toggle.style.transition= "top 0.55s, opacity 1.25s, transform 2.75s";
    toggle.style.transitionDelay= "top 0.15s, opacity 0.75s, transform 1.95s";
    toggle.addEventListener('click', () => {
      main.classList.remove('unintroduced');
      return;
    })
  }
});

// sidenav
openNav = () => document.getElementById('sidenav').style.width = "250px";
closeNav = () => document.getElementById('sidenav').style.width = "0";

// tab
const tab = document.querySelector('.tabnav');
const tabItems = Array.from( document.querySelectorAll('.tabnav .tabnav-row p') );
tabItems.map($this => {
  $this.addEventListener("click", () => {
    tabItems.forEach(item => item.className = '');
    $this.className = 'active';
  });
});

// control bar
const copyLink = (str) => {
  if (is_ie()) {
    window.clipboardData.setData("paaamil@gmail.com", str);
    alert("메일 주소가 복사되었습니다.");
    return;
  }
};

function gotop() {
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  console.log('gotop');
}

// header

window.addEventListener('scroll', (e) => {header();})

function header() {
  const header = document.querySelector('header');
  header.scrollTop > 0 ? header.classList.add('shrink') : header.className = '';
  console.log('scrolled')
}
'use strict';
const progress=document.getElementById('reading-progress');
function updateProgress(){const article=document.getElementById('materia');const start=article.offsetTop;const distance=Math.max(1,article.offsetHeight-innerHeight);progress.style.width=`${Math.min(100,Math.max(0,(scrollY-start)/distance*100))}%`;}
addEventListener('scroll',updateProgress,{passive:true});addEventListener('resize',updateProgress);updateProgress();

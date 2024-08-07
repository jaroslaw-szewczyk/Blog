const titleClickHandler = function(event){

  event.preventDefault();

  const clickedElement = this;

  console.log('Link was clicked!');
  console.log(event);

  /* [DONE]remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */
  console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active');

  /* [DONE]remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('article.active');

  for(const activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* [DONE]get 'href' attribute from the clicked link */
  const linkAtribute = clickedElement.getAttribute('href');

  /* [DONE]find the correct article using the selector (value of 'href' attribute) */
  const article = document.querySelector(linkAtribute);

  /* [DONE]add class 'active' to the correct article */
  article.classList.add('active');
};

const generateTitleLinks = function(){

  //[DONE]Removing all elements from the list
  const articleList = document.querySelector('ul.titles');
  articleList.innerHTML = '';

  //[DONE]generating a list of articles
  const articlesId = document.querySelectorAll('article');
  for(const articleId of articlesId){

    //Id of article
    const savedArticleId = articleId.id;

    //Title of article
    const articleTitle = articleId.querySelector('.post-title').innerHTML;

    //Creating new elements of the list
    const newLiElement = document.createElement('li');
    const newLinkElement = document.createElement('a');
    newLinkElement.href = '#' + savedArticleId;
    newLinkElement.innerHTML = articleTitle;
    articleList.appendChild(newLiElement).appendChild(newLinkElement);
  };
};

generateTitleLinks();

const links = document.querySelectorAll('.titles a');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
};


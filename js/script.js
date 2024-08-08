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

const optArticleSelector = '.post';
const optTitleSelector = '.post-title';
const optTitleListSelector = '.titles';
const optArticleTagsSelector = '.post-tags .list';

console.log(optArticleTagsSelector);

const generateTitleLinks = function(){

  //[DONE]Removing all elements from the list
  const articleList = document.querySelector(optTitleListSelector);
  articleList.innerHTML = '';

  let html = ' ';

  //[DONE]generating a list of articles
  const articlesId = document.querySelectorAll(optArticleSelector);
  for(const articleId of articlesId){

    //Id of article
    const savedArticleId = articleId.id;

    //Title of article
    const articleTitle = articleId.querySelector(optTitleSelector).innerHTML;

    //Creating new elements of the list
    const linkHtml = '<li><a href="#' + savedArticleId + '"><span>' + articleTitle + '</span></a></li>';
    // const newLiElement = document.createElement('li');
    // const newLinkElement = document.createElement('a');
    // newLinkElement.href = '#' + savedArticleId;
    // newLinkElement.innerHTML = articleTitle;
    // articleList.appendChild(newLiElement).appendChild(newLinkElement);
    html = html + linkHtml;
  };

  //[DONE]Adding all html to the list
  articleList.innerHTML = html;

};


function generateTags(){

  /* [DONE]find all articles */
  const allArticles = document.querySelectorAll(optArticleSelector);

  /* [DONE]START LOOP: for every article: */
  for(const article of allArticles){

    /* [DONE]find tags wrapper */
    const tagWrapper = article.querySelector(optArticleTagsSelector);

    /* [DONE]make html variable with empty string */
    let html = ' ';

    /* [DONE]get tags from data-tags attribute */
    const articleAttribute = article.getAttribute('data-tags');

    /* [DONE]split tags into array */
    const tagsArray = articleAttribute.split(' ');

    /* START LOOP: for each tag */
    for(const tag of tagsArray){
      /* generate HTML of the link */
      const linkHtml = '<li><a href="tag-' + tag + '"> ' + tag + ', </a></li>';
      /* add generated code to html variable */
      html =  html + linkHtml;
      /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagWrapper.innerHTML = html;
  /* END LOOP: for every article: */
  }
}

generateTags();

generateTitleLinks();

const links = document.querySelectorAll('.titles a');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
};


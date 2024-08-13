const opts = {
  optArticleSelector: '.post',
  optTitleSelector: '.post-title',
  optTitleListSelector: '.titles',
  optArticleTagsSelector: '.post-tags .list',
  optArticleAuthorSelector: '.post-author',
  optTagsListSelector: '.tags.list',
  optCloudClassCount: 5,
  optCloudClassPrefix: 'tag-size-',
};


const titleClickHandler = function(event){

  event.preventDefault();

  const clickedElement = this;

  /* [DONE]remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */
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

function generateTitleLinks(customSelector = ''){

  //[DONE]Removing all elements from the list
  const articleList = document.querySelector(opts.optTitleListSelector);
  articleList.innerHTML = '';

  let html = ' ';

  //[DONE]generating a list of articles
  const articlesId = document.querySelectorAll(opts.optArticleSelector + customSelector);

  for(const articleId of articlesId){

    //Id of article
    const savedArticleId = articleId.id;

    //Title of article
    const articleTitle = articleId.querySelector(opts.optTitleSelector).innerHTML;

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

function calculateTagsParams(allTags) {

  const parms = {
    min: 999999,
    max: 0,
  };

  for(const tag in allTags){
    parms.max = Math.max(allTags[tag], parms.max);
    parms.min = Math.min(allTags[tag], parms.min);
  }

  return parms;
};

function calculateTagClass(count, parms){
  const normalizedCount =  count - parms.min;
  const normalizedMax = parms.max - parms.min;

  const percentage = normalizedCount / normalizedMax;

  const classNumber = Math.floor(percentage * (opts.optCloudClassCount - 1) + 1);

  return opts.optCloudClassPrefix + classNumber;
};

function generateTags(){

  /* [OLD] create a new variable allTags with an empty array */
  // let allTags = [];

  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};

  /* [DONE]find all articles */
  const allArticles = document.querySelectorAll(opts.optArticleSelector);

  /* [DONE]START LOOP: for every article: */
  for(const article of allArticles){

    /* [DONE]find tags wrapper */
    const tagWrapper = article.querySelector(opts.optArticleTagsSelector);

    /* [DONE]make html variable with empty string */
    let html = ' ';

    /* [DONE]get tags from data-tags attribute */
    const articleAttribute = article.getAttribute('data-tags');

    /* [DONE]split tags into array */
    const tagsArray = articleAttribute.split(' ');
    // console.log(tagsArray);
    /* [DONE]START LOOP: for each tag */
    for(const tag of tagsArray){

      /* [DONE]generate HTML of the link */
      const linkHtml = '<li><a href="#tag-' + tag + '">' + tag + ',</a></li>';

      /* <DONE]add generated code to html variable */
      html =  html + linkHtml;

      /* [OLD] check if this link is NOT already in allTags */
      // if(allTags.indexOf(linkHtml) == -1){
      /* [OLD]add generated code to allTags array */
      //allTags.push(linkHtml);
      //}

      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags[tag]) {
      /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }

      /* END LOOP: for each tag */
    }

    /* [DONE]insert HTML of all the links into the tags wrapper */
    tagWrapper.innerHTML = html;

    /* END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(opts.optTagsListSelector);

  /* [OLD] add html from allTags to tagList */
  //tagList.innerHTML = allTags.join(' ');
  /* [NEW] create variable for all links HTML code */
  const tagsParams = calculateTagsParams(allTags);

  let allTagsHTML = '';

  /* [NEW] START LOOP: for each tag in allTags: */
  for(let tag in allTags){
    /* [NEW] generate code of a link and add it to allTagsHTML */
    allTagsHTML += '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag + ',</a></li>';
  }
  /* [NEW] END LOOP: for each tag in allTags: */

  /*[NEW] add HTML from allTagsHTML to tagList */
  tagList.innerHTML = allTagsHTML;
}

function tagClickHandler(event){
  /* [DONE]prevent default action for this event */
  event.preventDefault();

  /* [DONE]make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* [DONE]make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log(href);
  /* [DONE]make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');

  /* [DONE]find all tag links with class active */
  const tagLinks = document.querySelectorAll('a.active[href^="#tag-'+ tag +'"]');
  console.log('tag links',tagLinks);
  /* START LOOP: for each active tag link */
  for(const tagLink of tagLinks){
    /* [DONE]remove class active */
    tagLink.classList.remove('active');
  /* END LOOP: for each active tag link */
  }

  /* [DONE]find all tag links with "href" attribute equal to the "href" constant */
  const allTagHref = document.querySelectorAll(href);

  /* START LOOP: for each found tag link */
  for(const tagHref of allTagHref){
    /* add class active */
    tagHref.classList.add('active');
  /* END LOOP: for each found tag link */
  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');

  console.log('to ja');
}

function generateAuthors() {

  //finding all articles
  const allArticles = document.querySelectorAll(opts.optArticleSelector);

  //Loop through all the articles
  for(const article of allArticles) {

    //findin a wrapper
    const pWrapper = article.querySelector(opts.optArticleAuthorSelector);

    //collecting authors from an article attribute
    const articleAttribute = article.getAttribute('data-author');

    //adding authors to DOM element
    pWrapper.innerHTML = 'by <a href="' + articleAttribute + '">' + articleAttribute + '</a>';

  }
}

function addClickListenersToTags(){
  /* [DONE]find all links to tags */
  const links = document.querySelectorAll('.post-tags li a, ul.tags li a');

  /* START LOOP: for each link */
  for(const link of links){
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
  }
  /* END LOOP: for each link */
}

function authorClickHandler(event) {
  /* [DONE]prevent default action for this event */
  event.preventDefault();

  /* [DONE]make new constant named "clickedElement" and give it the value of "this" */
  const clickedAuthor = this;

  /*[DONE]make a new constant and read the attribute "href" of the clicked element */
  const href = clickedAuthor.getAttribute('href');

  /* [DONE]find all tag links with class active */
  const activeAuthors = document.querySelectorAll('a.active[href^="' + href + '"]');

  /* START LOOP: for each active tag link */
  for(const activeAuthor of activeAuthors){
    /* [DONE]remove class active */
    activeAuthor.classList.remove('active');
  /* END LOOP: for each active tag link */
  }

  /* [DONE]find all tag links with "href" attribute equal to the "href" constant */
  const allAuthorHref = document.querySelectorAll('.post-author a[href="' + href + '"]');

  /* START LOOP: for each found tag link */
  for(const authorHref of allAuthorHref){
    /* add class active */

    authorHref.classList.add('active');
    /* END LOOP: for each found tag link */
  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + href + '"]');
}

function addClickListenersToAuthors(){

  const authorLinks = document.querySelectorAll('p.post-author a');

  for(const authorLink of authorLinks) {
    authorLink.addEventListener('click', authorClickHandler);
  }
}

generateAuthors();
generateTags();
generateTitleLinks();

addClickListenersToTags();
addClickListenersToAuthors();

const links = document.querySelectorAll('.titles a');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
};


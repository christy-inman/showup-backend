
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('protests').del()
    .then(function () {
      // Inserts seed entries
      return knex('protests').insert([
        {
          title: 'Reproduction Rights',
          image: 'https://www.colorlines.com/sites/default/files/styles/embedded_image/public/images/articles/2015/01/54798165114c7a958458o.jpg?itok=kO0_UmCC&timestamp=1429386402',
          date: '2019-09-21',
          time: '4:00 PM - 7:00 PM',
          location: '200 E Colfax Ave, Denver, CO 80203',
          description: 'Current governments throughout the country are challenging Roe V. Wade ruling to keep abortions safe and legal for all women. Come out and join us to stand up against these bills. We\'ll gather in front of the capitol building, bring signs, coordinate outifts, and brainstorm chants.',
          donate: 'https://www.weareplannedparenthoodaction.org/onlineactions/6iOI0_HnUUmPu_6_SRgayg2?sourceid=1006442&ms=4NALz2000K1N1A&gclid=Cj0KCQjwh8jrBRDQARIsAH7BsXcE5uVmd5DLPsqIEQGYkn_Rm7QXfJ7bQ_OuFZNE2GWmTd-leqNTqdEaAkwbEALw_wcB&gclsrc=aw.ds'
        },
        {
          title: 'Amazon Rainforest Rehabilitation',
          image: 'https://imageproxy.themaven.net/https%3A%2F%2Fimages.saymedia-content.com%2F.image%2FMTY2NDk4NjI4NjQ1NDMwNTE0%2Famazon-burning.jpg',
          date: '2019-09-15',
          time: '3:00 PM - 6:00 PM',
          location: '200 E Colfax Ave, Denver, CO 80203',
          description: 'As many of us know, the Amazon Rainforests have been on fire for weeks, and we are only half of the way through this years dry season, so it is likely they will get worse. Come out and show support for more strict logging and burning laws. We want to spread awareness about how people can help restore the areas that have burned, and prevent this level of distruction from happening again in the coming years. Show up, and spaek out with us.',
          donate: 'https://support.worldwildlife.org/site/Advocacy?cmd=display&page=UserAction&id=1015&s_src=GoogleAdsAdvo&s_subsrc=amazon&gclid=Cj0KCQjwh8jrBRDQARIsAH7BsXdsb8Q-i_2xjJk_CW5M7IqQRUc2ryI0RpX5KaycaLd6RgYTulmmWvkaApVMEALw_wcB'
        },
        {
          title: 'Capstone Projects',
          image: 'https://media.bizj.us/view/img/11133711/flatironschool3*750xx2560-1443-0-39.jpg',
          date: '2019-09-12',
          time: '4:30 PM - 6:30 PM',
          location: '3601 Walnut Street Denver, CO 80205',
          description: 'As coaches we believe that three weeks is way too long for capstone projects. We will be around to chat about why we feel this way during the whole event',
          donate: 'Venmo Link'
        },
      ]);
    });
};

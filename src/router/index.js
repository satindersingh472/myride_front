import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from "@/views/homePage.vue"
import DiscoverRides from "@/views/discoverRides.vue"
import RoughPage from "@/views/roughPage.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: HomePage,
    meta:[
      {
        title: "MyRide.ml"
      },
      {
        name: "author",
        content: "Satinder Singh"
      },
      {
        name: 'description',
        content: 'My Ride is the one and only marketplace for rides,it is for the people who want to travel from city to city'
      },
      {
        name: 'keywords',
        content: 'easy to find rides, people first,accessible,affordable'
      }
    ]
  },
  {
    path: '/discover_rides',
    component: DiscoverRides,
    meta:[
      {
        title: "MyRides_rides",
      },
      {
        name: "author",
        content: "Satinder Singh"
      },
      {
        name: 'description',
        content: 'latest rides from various cities and affordable rides'
      },
      {
        name: 'keywords',
        content: 'myride,easy,affordable'
      }
    ]
  },
  {
    path: '/rough_page',
    component: RoughPage,
    meta:[
      {
        title: 'Rough Page'
      }
    ]
  }
  
]

const router = new VueRouter({
  routes
})
/*remove the old meta tag */
router.beforeEach((to, from, next) => {
  let current_meta_tags = document.querySelectorAll(`meta`);
  for (let i = 0; i < current_meta_tags.length; i++) {
    current_meta_tags[i].remove();
  }
  /*put the title tag inside head */
  let new_meta_tags = to[`meta`];
  document.querySelector(`title`)[`innerText`] = new_meta_tags[0][`title`];
/*put the other meta tags other than the title tag inside the head */
  for (let i = 1; i < new_meta_tags.length; i++) {
    document
      .querySelector(`head`)
      .insertAdjacentHTML(
        `afterbegin`,
        `<meta name="${new_meta_tags[i][`name`]}" content="${
          new_meta_tags[i][`content`]
        }"/>`
      );
  }
  document.querySelector(`head`).insertAdjacentHTML(
    `afterbegin`,
    `<meta charset="utf-8">
 <meta http-equiv="X-UA-Compatible" content="IE=edge">
 <meta name="viewport" content="width=device-width,initial-scale=1.0">`
  );

  from;
  next();
});



export default router

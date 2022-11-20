import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "@/views/homePage.vue";
import ClientSignup from "@/views/clientSignup.vue";
import DiscoverRides from "@/views/discoverRides.vue";
import PostRide from "@/views/postRide.vue";
import PostedRides from "@/views/postedRides.vue";
import ClientVerified from "@/views/clientVerified.vue";
import PassengerBookings from "@/views/passengerBookings.vue";
import RiderBookings from "@/views/riderBookings.vue";
import PersonalProfile from "@/views/personalProfile.vue";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: HomePage,
    meta: [
      {
        title: "MyRide.ml",
      },
      {
        name: "author",
        content: "Satinder Singh",
      },
      {
        name: "description",
        content:
          "My Ride is the one and only marketplace for rides,it is for the people who want to travel from city to city",
      },
      {
        name: "keywords",
        content: "available_rides, cheap_rides, affordable_way_of_travelling, safe_rides, reliable_rides, travelling, riders, passengers",
      },
    ],
  },
  {
    path: "/discover_rides",
    component: DiscoverRides,
    meta: [
      {
        title: "MyRides_rides",
      },
      {
        name: "author",
        content: "Satinder Singh",
      },
      {
        name: "description",
        content: "See the upcoming rides from one place to another and also search any upcoming rides with the help of search option.",
      },
      {
        name: "keywords",
        content: "search_rides, available_rides, upcoming_rides, affordable_rides, cheap_rides, safe_rides, people_helping_people ",
      },
    ],
  },
  {
    path: "/post_ride",
    component: PostRide,
    meta: [
      {
        title: "New Ride",
      },
      {
        name: "author",
        content: "Satinder Singh",
      },
      {
        name: "description",
        content: "Post new ride to make money and help people",
      },
      {
        name: "keyword",
        content: "my rides, find_rides_easily,helping_people",
      },
    ],
  },
  {
    path: "/posted_rides",
    component: PostedRides,
    meta: [
      {
        title: "Posted Rides",
      },
      {
        name: "author",
        content: "Satinder Singh",
      },
      {
        name: "description",
        content: "users can easily access all their rides posted",
      },
      {
        name: "keywords",
        content: "rides,upcoming rides,edit rides,delete rides",
      },
    ],
  },
  {
    path: "/client_signup",
    component: ClientSignup,
    meta: [
      {
        title: "MyRide Signup",
      },
      {
        name: "author",
        content: "Satinder Singh",
      },
    ],
  },
  {
    path: "/client_verified",
    component: ClientVerified,
    meta: [
      {
        title: "Client Verification",
      },
      {
        name: "author",
        content: "Satinder Singh",
      },
      {
        name: "description",
        content: "Client verification notification page",
      },
      {
        name: "keywords",
        content: "client_verification, easy",
      },
    ],
  },
  {
    path: "/passenger_bookings",
    component: PassengerBookings,
    meta: [
      {
        title: "Passenger Bookings",
      },
      {
        name: "author",
        content: "Satinder Singh",
      },
      {
        name: "description",
        content: "See all the rides booked as a passenger",
      },
      {
        name: "keywords",
        content: "rides,upcoming rides,all the details",
      },
    ],
  },
  {
    path: "/rider_bookings",
    component: RiderBookings,
    meta: [
      {
        title: "Rider Bookings",
      },
      {
        name: "author",
        content: "Satinder Singh",
      },
      {
        name: "description",
        content: "find bookings associated with rides",
      },
      {
        name: "keywords",
        content: "Myrides,bookings,passenger,connecting,riders",
      },
    ],
  },
  {
    path: '/personal_profile',
    component: PersonalProfile,
    meta:[
      {
        title: 'Personal Profile'
      },
      {
        name: 'author',
        content: 'Satinder Singh'
      },
      {
        name: 'description',
        content: 'Clients can their personal profile and make changes to it'
      },
      {
        name: 'keywords',
        content: 'myride,clients,profile,make_changes'
      }
    ]
  }
];

const router = new VueRouter({
  routes,
});
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

export default router;

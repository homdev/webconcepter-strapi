module.exports = {
  routes: [
    {
     method: 'POST',
     path: '/tracker',
     handler: 'tracker.recordInterest',
     config: {
       policies: [],
       middlewares: [],
     },
    },
  ],
};

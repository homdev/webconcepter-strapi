'use strict';

const { RecordInterestValidator } = require("../../../validators/tracker.js");

/**
 * A set of functions called "actions" for `tracker`
 */

module.exports = {
  async recordInterest(ctx, next) {
    try {
      const data = RecordInterestValidator.safeParse(ctx.request.body)
      
      if(!data.success) {
        ctx.status = 400;
        ctx.body = {success: false, message: 'invalid data format'};
        return;
      }
  
      await strapi.entityService.create('api::interest.interest', data);
        

      ctx.body = {success: true};
    } catch (err) {
      ctx.badRequest("Post report controller error", { moreDetails: err });
    }
  },
};
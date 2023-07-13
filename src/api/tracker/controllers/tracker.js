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

      const {mail, context, identifier} = data.data;

      const entries = await strapi.entityService.findMany('api::interest.interest', {
        fields: ['id', 'identifiers'],
        filters: { mail, context },
      });
  
      if(entries.length === 0) {
        await strapi.entityService.create('api::interest.interest', {
          data: {
            mail, 
            context,
            identifiers: [identifier]
          }
        });
      } else {
        await strapi.entityService.update('api::interest.interest', entries[0].id, {
          data: {
            identifiers: [...entries[0].identifiers, identifier]
          }
        }); 
      }

      ctx.body = {success: true};
    } catch (err) {
      console.log(err);
      ctx.badRequest("Post report controller error", { moreDetails: err });
    }
  },
};
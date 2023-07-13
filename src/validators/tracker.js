const { z } = require("zod");

module.exports = {
    RecordInterestValidator: z.object({
        mail: z.string().email(),
        context: z.string(), 
        identifier: z.string()
    })
};
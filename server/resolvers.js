const db = require("./db");

const Query = {
  job: (parent, args) => db.jobs.get(args.id),
  company: (parent, args) => db.companies.get(args.id),
  jobs: () => db.jobs.list(),
};

const Mutation = {
  createJob: (parent, { input }, context) => {
    if (!context.user) {
      throw new Error("Unauthorized");
    }
    const id = db.jobs.create({ ...input, companyId: context.user.companyId });
    return db.jobs.get(id);
  },
};

const Job = {
  company: (parent, args) => db.companies.get(parent.companyId),
};

const Company = {
  jobs: (parent, args) =>
    db.jobs.list().filter((job) => job.companyId === parent.id),
};

module.exports = {
  Query,
  Job,
  Company,
  Mutation,
};

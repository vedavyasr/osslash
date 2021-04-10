const chai = require("chai");
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");
const faker = require("faker");
const sequelize = require("sequelize");
chai.use(chaiAsPromised);
const should = chai.should();

const models = require("../../../models");

const PostsController = require("../../../controllers/PostController");
const ApprovalController = require("../../../controllers/ApprovalController");

describe("Posts for User Test Cases", async () => {
  let postPayload, post;
  before(async () => {
    const users = await models.User.findAll({
      where: { userRoleId: { [sequelize.Op.eq]: 1 } },
    });
    postPayload = {
      userId: faker.random.arrayElement(users).id,
      content: faker.random.word(),
    };
  });
  it("should create post for user", async () => {
    let transaction = await models.sequelize.transaction();
    const postController = new PostsController();
    post = await postController.createOrEditPost(postPayload, transaction);

    await transaction.commit();
    let createdPost = await models.Post.findOne({
      where: { content: postPayload.content, userId: postPayload.userId },
    });
    post = createdPost;
    let changeLog = await models.ChangeLog.findOne({
      where: {
        postId: createdPost.id,
      },
    });
    createdPost.should.have.property("id");
    createdPost.should.have.property("content");
    createdPost.should.have.property("userId");
    expect(createdPost)
      .to.have.property("content")
      .and.to.be.equal(postPayload.content.toLowerCase());
    expect(createdPost)
      .to.have.property("userId")
      .and.to.be.equal(postPayload.userId);
    expect(changeLog)
      .to.have.property("postId")
      .and.to.be.equal(createdPost.id);
  });
  it("should update post for user", async () => {
    const updatePayload = {
      postId: post.id,
      content: faker.random.word(),
      userId: post.userId,
    };
    let transaction = await models.sequelize.transaction();
    const postController = new PostsController();
    post = await postController.createOrEditPost(updatePayload, transaction);

    await transaction.commit();
    let createdPost = await models.Post.findOne({
      where: { content: updatePayload.content, userId: updatePayload.userId },
    });
    let changeLog = await models.ChangeLog.findOne({
      where: {
        postId: createdPost.id,
      },
    });
    createdPost.should.have.property("id");
    createdPost.should.have.property("content");
    createdPost.should.have.property("userId");
    expect(createdPost)
      .to.have.property("content")
      .and.to.be.equal(updatePayload.content);
    expect(createdPost)
      .to.have.property("userId")
      .and.to.be.equal(updatePayload.userId);
    expect(changeLog)
      .to.have.property("postId")
      .and.to.be.equal(createdPost.id);
  });
});

describe("Posts for Admin Test Cases", async () => {
  let post, approvalRequest, postPayload;
  before(async () => {
    const adminUsers = await models.User.findAll({
      where: { userRoleId: { [sequelize.Op.eq]: 2 } },
    });
    const users = await models.User.findAll({
      where: { userRoleId: { [sequelize.Op.eq]: 1 } },
    });
    postPayload = {
      adminId: faker.random.arrayElement(adminUsers).id,
      content: faker.random.word(),
      userId: faker.random.arrayElement(users).id,
    };
  });
  it("should create post By admin", async () => {
    let transaction = await models.sequelize.transaction();
    const postController = new PostsController();
    post = await postController.createOrEditPost(postPayload, transaction);

    await transaction.commit();
    let createdPost = await models.Post.findOne({
      where: { content: postPayload.content, userId: postPayload.userId },
    });
    let changeLog = await models.ChangeLog.findOne({
      where: {
        postId: createdPost.id,
      },
    });
    approvalRequest = await models.Approval.findOne({
      where: {
        postId: createdPost.id,
      },
    });
    post = createdPost;
    createdPost.should.have.property("id");
    createdPost.should.have.property("content");
    createdPost.should.have.property("userId");
    expect(createdPost)
      .to.have.property("content")
      .and.to.be.equal(postPayload.content);
    expect(createdPost).to.have.property("isApproved").and.to.be.equal(false);
    expect(createdPost)
      .to.have.property("userId")
      .and.to.be.equal(postPayload.userId);
    expect(createdPost)
      .to.have.property("createdBy")
      .and.to.be.equal(postPayload.adminId);
    expect(changeLog)
      .to.have.property("postId")
      .and.to.be.equal(createdPost.id);
    expect(approvalRequest)
      .to.have.property("postId")
      .and.to.be.equal(approvalRequest.postId);
  });

  it("approve post requests", async () => {
    let transaction = await models.sequelize.transaction();
    const payload = {
      requestId: approvalRequest.id,
      status: "Accepted",
      userId: 5,
    };
    await ApprovalController.approveRequest(payload, transaction);
    await transaction.commit();
    const approval = await models.Approval.findOne({
      where: { id: payload.requestId },
    });
    const approvedPost = await models.Post.findOne({ where: { id: post.id } });
    expect(approval).to.have.property("status").and.to.be.equal("Accepted");
    expect(approvedPost).to.have.property("isApproved").and.to.be.equal(true);
  });
});

describe("delete post", async () => {
  let postPayload, post, postController, request;
  before(async () => {
    const users = await models.User.findAll({
      where: { userRoleId: { [sequelize.Op.eq]: 1 } },
    });
    postPayload = {
      userId: faker.random.arrayElement(users).id,
      content: faker.random.word(),
    };
    let transaction = await models.sequelize.transaction();
    postController = new PostsController();
    await postController.createOrEditPost(postPayload, transaction);
    await transaction.commit();
    post = await models.Post.findOne({
      where: { content: postPayload.content, userId: postPayload.userId },
    });
  });

  it("should delete a post", async () => {
    await postController.deletePost({ userId: post.userId, postId: post.id });
    post = await models.Post.findOne({ where: { id: post.id } });
    expect(post).to.have.property("deletedAt").and.to.be.not.null;
    expect(post).to.have.property("deletedBy").and.to.be.not.null;
  });
});

describe("delete post by admin", async () => {
  let postPayload, post, postController, approveRequest;
  before(async () => {
    const users = await models.User.findAll({
      where: { userRoleId: { [sequelize.Op.eq]: 2 } },
    });
    postPayload = {
      adminId: faker.random.arrayElement(users).id,
      userId: 1,
      content: faker.random.word(),
    };
    let transaction = await models.sequelize.transaction();
    postController = new PostsController();
    await postController.createOrEditPost(postPayload, transaction);
    await transaction.commit();
    post = await models.Post.findOne({
      where: { content: postPayload.content, userId: postPayload.userId },
    });
  });

  it("should delete a post", async () => {
    await postController.deletePost({
      userId: post.userId,
      postId: post.id,
      adminId: 3,
    });
    post = await models.Post.findOne({ where: { id: post.id } });
    approveRequest = await models.Approval.findOne({
      where: { postId: post.id, actionNotes: "Delete" },
    });
    expect(post).to.have.property("deletedAt").and.to.be.null;
    expect(post).to.have.property("deletedBy").and.to.be.null;
    expect(post).to.have.property("isApproved").and.to.be.equal(false);
    expect(approveRequest)
      .to.have.property("actionNotes")
      .and.to.be.equal("Delete");
  });

  // it("should approve the delete request", async () => {
  //   const approvedRequest = await ApprovalController.approveRequest({
  //     requestId: approveRequest.id,
  //     status: "Approved",
  //     userId: 5,
  //   });
  //   const approvedPost = await models.Post.findOne({
  //     where: { id: approvedRequest.postId },
  //   });
  //   expect(approvedRequest)
  //     .to.have.property("status")
  //     .and.to.be.equal("Accepted");
  //   expect(approvedPost).to.have.property("deletedAt").and.to.be.null;
  //   expect(approvedPost).to.have.property("deletedBy").and.to.be.null;
  // });
});

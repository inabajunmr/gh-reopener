module.exports = (robot) => {
  robot.on('issues.closed', async context => {
    const exist_label = context.payload.issue.labels.length != 0;
    const exist_milestone = context.payload.issue.milestone != '';
    if (exist_label && exist_milestone) {
      return;
    }
    const comment = context.issue({body: 'You must add milestone and label!'})
    context.github.issues.createComment(comment)
    const close = context.issue({state: 'open'})
    context.github.issues.edit(close)
  })
}



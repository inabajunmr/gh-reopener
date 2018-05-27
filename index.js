module.exports = (robot) => {
  robot.on('issues.opened', async context => {
    context.log(context.payload)
    exist_label = context.payload.issue.labels.length != 0;
    exist_milestone = context.payload.issue.milestone != '';
    context.log("EXIST LABEL:" + exist_label);
    context.log("EXIST MILESTONE:" + exist_milestone);
    if (exist_label && exist_milestone) {
      return;
    }
    const comment = context.issue({body: 'ラベルとマイルストーンをつけてくれ〜'})
    context.github.issues.createComment(comment)
    const close = context.issue({state: 'closed'})
    context.github.issues.edit(close)
  })
}


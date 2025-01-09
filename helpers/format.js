exports.formatData = (data) => {
  return data.map((item) => ({
    id: item.id,
    title: item.title,
    content: item.content,
    tag: item.Tag.name,
  }));
};

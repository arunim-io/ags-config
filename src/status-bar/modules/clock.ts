export default Widget.Label({
  label: Variable("", { poll: [1000, 'date "+%A %x %X"'] }).bind(),
});

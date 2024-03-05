export default Widget.Label({
	class_name: "clock",
	label: Variable("", { poll: [1000, 'date "+%A %x %X"'] }).bind(),
});

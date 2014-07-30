var game = {
	animating: false,
	gameGrid: null,
	direction: null,
	isOver: false,
    nextColor: null,
    currentLevel: 0,
    numLevels: 3,
    levels: [{columns:4, rows:4, maxScore:5, colors:2}, {columns:8, rows:8, maxScore:10, colors:3}, {columns:10, rows:10, maxScore:10, colors:5}],
	defaultCellColor: '#212745',
	cellWidth: 0

}
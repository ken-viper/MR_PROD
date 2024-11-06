////////////////////////////////////////////////////////////
// LEVELS
////////////////////////////////////////////////////////////

var levels_arr = [
					{
						level:{src:'assets/1.png', resource:200, life:3, tower:[1,2,3], towerupgrade:[2,2]},
						path:[[{r:7, c:4},{r:7, c:5},{r:7, c:6},{r:7, c:7},{r:6, c:7},{r:5, c:7},{r:5, c:8},{r:5, c:9},{r:6, c:9},{r:6, c:10},{r:7, c:10},{r:7, c:11},{r:7, c:12},{r:7, c:13},{r:7, c:14},{r:7, c:15},{r:6, c:15},{r:6, c:16},{r:5, c:16},{r:5, c:17},{r:5, c:18},{r:5, c:19},{r:5, c:20},],],
						wave:[[{delay:7, list:'1,1,1,1', space:2, speed:2},],
],
						tower:[{r:6, c:6},{r:7, c:8},{r:6, c:11},{r:6, c:14},{r:4, c:17},]
					},

					{
						level:{src:'assets/1.png', resource:200, life:3, tower:[1,2,3], towerupgrade:[]},
						path:[[{r:6, c:5},{r:6, c:6},{r:6, c:7},{r:6, c:8},{r:6, c:9},{r:6, c:10},{r:6, c:11},{r:6, c:12},{r:6, c:13},{r:6, c:14},{r:6, c:15},{r:6, c:16},{r:6, c:17},{r:6, c:18},{r:6, c:19},{r:6, c:20},],],
						wave:[[{delay:1, list:'1,1,1,1', space:1, speed:2},],
],
						tower:[{r:5, c:8},{r:7, c:11},{r:5, c:16},{r:7, c:13},]
					},

					{
						level:{src:'assets/1.png', resource:200, life:3, tower:[1,2,3], towerupgrade:[]},
						path:[[{r:4, c:6},{r:5, c:6},{r:6, c:6},{r:6, c:7},{r:6, c:8},{r:6, c:9},{r:6, c:10},{r:6, c:11},{r:6, c:12},{r:6, c:13},{r:6, c:14},{r:6, c:15},{r:6, c:16},{r:7, c:16},{r:8, c:16},],],
						wave:[[{delay:1, list:'1,1,1,1', space:1, speed:2},],
],
						tower:[{r:5, c:5},{r:5, c:9},{r:7, c:5},{r:7, c:9},{r:7, c:13},{r:7, c:17},]
					},

					{
						level:{src:'assets/1.png', resource:200, life:3, tower:[1,2,3], towerupgrade:[undefined]},
						path:[[{r:9, c:10},{r:8, c:10},{r:7, c:10},{r:6, c:10},{r:6, c:11},{r:6, c:12},{r:6, c:13},{r:6, c:14},{r:6, c:15},{r:7, c:15},{r:8, c:15},],],
						wave:[[{delay:1, list:'1,1,1,1', space:1, speed:2},],
],
						tower:[{r:8, c:9},{r:6, c:9},{r:7, c:12},{r:7, c:17},{r:5, c:16},]
					},

					];
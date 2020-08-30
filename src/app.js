const {encapsulation, define} = require('./');

let datas = {
	pages: null,
	itemsPaginator: {},
	allElementSlider: null,
	elements: []
};

encapsulation(datas);

// ## SET VALUES
datas.set('items.paginator', true, 'pages.paginator');
datas.set('all.element.slider', 10);

// ### ADD VALUES
datas.add('elements', 10);

// ### HAS (Contains or not)
// console.log(datas.has('elements', 1));

let datas2 = define({
	'paginator': {
		'items': [1,2,3],
		'element': {
			'pager': null,
			'perview': null
		},
		'blocks': null
	}
});
































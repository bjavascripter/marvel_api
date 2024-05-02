class superheroApi {
	constructor() {
		this.apiUrl = 'https://gateway.marvel.com:443/v1/public';
		this.key = 'e5390d7e40d2cb3405220177edfc2b5c';
	}

	searchByName(name, callback) {
		const url = this.apiUrl + '/characters';
		const parameters = {
			'nameStartsWith': name,
			'limit': 30,
			'offset': 0,
			'apikey': this.key
		};

		$.getJSON(url, parameters)
			.done((data) => {
      console.log(data)
				callback(data);
			})
			.fail((response) => {
				callback(null);
			});
	}
}

class showResults {
	constructor() {
		this.marvelApi = new superheroApi();
		this.elements = {
			'form': $('#search-form'),
			'input': $('#input-name'),
			'results': $('#results')
		};
		this.registerEvents();
	}

	registerEvents () {
		this.elements.form.on(
			'submit',
			(e) => {
				e.preventDefault();

				this.marvelApi.searchByName(
					this.elements.input.val().trim(),
					(data) => {
						this.printResults(data);
					}
				);
			}
		);
	}

	printResults(data) {
		console.log(data);
		$('.character-list').html('');
		data.results.forEach((item) => {
			$('.character-list').append(`
        <li class="list-item" data-id="1011054">
            <div class="name">${item.name}</div>
            <div class="thumbnail">
                <img src="${item.thumbnail.path}.${item.thumbnail.extension}"
                     width="250"
                     height="250">
            </div>
            <div class="description text-center text-muted">
                ${item.description}
            </div>

        </li>
      `);
		});
	}

	clearResults() {
		this.elements.results('break');
	}
}

const marvelApi = new showResults();

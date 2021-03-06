import React from 'react';

class form extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            name : "",
            img_male : "#",
            img_shiny: "#",
            species: "",
            type: "",
            loading: true
        }

    }
    /*
        function : pokeAPI
        Description: Obtiene la información de la pokeapi
    */
    pokeAPI = async () =>{
        let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${this.state.name}`);
        //let res = await fetch('https://pokeapi.co/api/v2/pokemon/ditto');
        let data = await res.json();

        console.log(data);
        this.setState({
            img_male: data.sprites.front_default,
            img_shiny: data.sprites.front_shiny,
            species: data.species.name,
            type: data.types[0].type.name,
            loading: true
        });
    }

    handleName= event =>{
        this.setState({
            name: event.target.value
        });
    }

    handleSubmit = event =>{
        var sub = this.state.name;
        this.setState({
            loading: false
        });
        //console.log(sub);
        this.pokeAPI();

       
        //Evento que permite que no se recargue la pagina
        event.preventDefault();
    }

    render(){
      return ( 
        <div className="card text-center">
            <div className="card-header">
                POKEDEX Pokémon
            </div>
            <div className="card-body">
                <h5 className="card-title">Consulte su pokémon</h5>

                <form onSubmit={this.handleSubmit}>
                    <label>Ingrese el nombre del pokémon:</label><br />
                        <div className="input-group input-group-sm mb-3">
                            <span className="input-group-text" id="inputGroup-sizing-sm">Pokémon:</span>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder = "ingrese el nombre del pokémon"
                                value={this.state.name}
                                onChange={this.handleName}
                                /><br/><br/>
                        </div>
                    <button type="submit" href="#" className="btn btn-primary">Buscar el pokémon</button>
                    
                    <br/><br/>
                    <label>Pokémon normal</label><br/>
                    <img src={this.state.img_male} className="img-thumbnail" alt="..."></img><br/>
                    <label>Pokémon Shiny</label><br/>
                    <img src={this.state.img_shiny} className="img-thumbnail" alt="..."></img>

                    <div className="input-group input-group-sm mb-3">
                            <span className="input-group-text" id="inputGroup-sizing-sm">type:</span>
                            <input 
                               className="form-control" 
                               type="text" 
                               placeholder={this.state.type} 
                               aria-label="Disabled input example" 
                               disabled readOnly  />
                    </div>
                    <div className="input-group input-group-sm mb-3">
                            <span className="input-group-text" id="inputGroup-sizing-sm">Specie:</span>
                            <input 
                               className="form-control" 
                               type="text" 
                               placeholder={this.state.species}
                               aria-label="Disabled input example" 
                               disabled readOnly  />
                    </div>
                </form>
            </div>
            <div className="card-footer text-muted">
                PokeAPI
            </div>
        </div>
       );
    }
 }
 
 
 export default form;
import React, { Component } from 'react';
import Axios from 'axios';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import ImageResults from '../image-results/ImageResult';

class Search extends Component {

    state = {
        searchText:'',
        amount: 10,
        apiUrl: 'https://pixabay.com/api',
        apiKey: '10273023-55ba2355bd5ce1c49ee9e494a',
        images: []
    }

    onTextChange = (e) => {
        this.setState({[e.target.name]: e.target.value}, () => {
            Axios.get(`${this.state.apiUrl}/?key=${this.state.apiKey}&q=${
                this.state.searchText
            }&image_type=photo&per_page=${this.state.amount}&safesearch=true`
            )
            .then(res => this.setState({ images: res.data.hits }))
            .catch(err => console.log(err));
        });
    } 

    onAmountChange = (e, index, value) => this.setState({ amount: value });

    render(){
        console.log(this.state.images);
        return (
            <div>
                <TextField 
                    name="searchText"
                    value={this.state.searchText}
                    onChange={this.onTextChange}
                    floatingLabelFixed="Search For Images"
                    fullWidth={true}
                />
                <br />
                <SelectField name="amount"
                             floatingLabelText="Amount"
                             value={this.state.amount}
                             onChange={this.onAmountChange} 
                >
                    <MenuItem value={5}  primaryText="5" />
                    <MenuItem value={10} primaryText="10" />
                    <MenuItem value={15} primaryText="15" />
                    <MenuItem value={30} primaryText="30" />
                    <MenuItem value={50} primaryText="50" />
                </SelectField>
                <br />
                {this.state.images.length > 0 ? (<ImageResults images={this.state.images} />) : null}
            </div>
        );
    }
}

export default Search;
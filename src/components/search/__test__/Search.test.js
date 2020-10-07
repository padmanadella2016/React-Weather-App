import React from 'react'
import ReactDom from "react-dom"
import Search from './../Search'
import {render, fireEvent } from '@testing-library/react'


it("renders withouth crashing", ()=>{
    const div = document.createElement("div");
    ReactDom.render(<input></input>, div)
})

it("renders correctly", () =>{
    const {queryByTestId, queryByPlaceholderText} = render(<Search/>)
    expect(queryByTestId("search-button")).toBeTruthy()
    expect(queryByPlaceholderText("city..")).toBeTruthy()
});

describe("Input value", () =>{
    it("updates on change", () =>{
        const{queryByPlaceholderText}= render (<Search/>)
        const searchInput = queryByPlaceholderText('city..');
        fireEvent.change(searchInput, {target: {value:"test"}})
        expect(searchInput.value).toBe("test")

    
    })
})
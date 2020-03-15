﻿const axios = require('axios')

class API {
    constructor({ url }) {
        this.url = url
        this.endpoints = {}
    }

    /**
    * Create and store a single entity's endpoints
    * @param {A entity Object} entity
    */
    createEntity(entity) {
        this.endpoints[entity.name] = this.createBasicCRUDEndpoints(entity)
    }

    /**
    * Create the basic endpoints handlers for CRUD operations
    * @param {A entity Object} entity
    */
    createBasicCRUDEndpoints( {name} ) {
        
        var endpoints = {}

        const resourceURL = `${this.url}/${name}`

        endpoints.getAll = ({ query } = {}) => axios.get(resourceURL, { params: { query } })

        endpoints.getOne = ({ id }) => axios.get(`${resourceURL}/${id}`)

        endpoints.getTwo = ({ id_a , id_b }) => axios.get(`${resourceURL}/${id_a}/${id_b}`)

        //endpoints.create = (toCreate) => axios.post(resourceURL, toCreate)

        //endpoints.update = (toUpdate) => axios.put(`${resourceURL}/${toUpdate.id}`, toUpdate)

        //endpoints.delete = ({ id }) => axios.delete(`${resourceURL}/${id}`)

        return endpoints;
    }

}

export default API
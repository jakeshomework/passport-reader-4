import { gql } from "apollo-boost";

export default gql(`
	query GET_USER($var: String!){
		actualApiName(var:$var) {


	}
`);
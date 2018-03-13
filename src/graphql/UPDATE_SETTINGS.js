import { gql } from "apollo-boost";

export default gql(`
	mutation UPDATE_SETTINGS($var: String!){
		actualApiName(var:$var) {


	}
`);
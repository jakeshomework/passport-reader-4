import { gql } from "apollo-boost";

export default gql(`
	mutation UPDATE_HIGHLIGHT($var: String!){
		actualApiName(var:$var) {


	}
`);
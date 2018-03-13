import { gql } from "apollo-boost";

export default gql(`
	mutation GET_HIGHLIGHT_BY_ID($var: String!){
		actualApiName(var:$var) {


	}
`);
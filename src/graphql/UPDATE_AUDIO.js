import { gql } from "apollo-boost";

export default gql(`
	mutation UPDATE_AUDIO($var: String!){
		actualApiName(var:$var) {


	}
`);
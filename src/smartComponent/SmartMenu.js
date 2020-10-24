import React from 'react'
import { Menu } from 'semantic-ui-react'

import { bindActionCreators }	from 'redux';
import { connect } 				from 'react-redux';

import { useHistory } from 'react-router-dom';

import { menu } from '../actions';

const SmartMenu =(props)=>{
  let history = useHistory();

  const click = (e, { name }) => {
     
    history.push(name)
  }

    let {location} = props;
    let {pathname} = location;

    return (
      <Menu color="olive" inverted size='massive'>
        <Menu.Item
          name='/'
          active={pathname === '/'}
          onClick={click.bind(this)}
        >
          Home
        </Menu.Item>

        {props.active_user?<Menu.Item
          name='/chat/contact'
          active={pathname === '/chat/contact'}
          onClick={click.bind(this)}
        >
          Chat
        </Menu.Item>:""}

      </Menu>
    )
 
}


function mapStateToProps(state){
	return (
		{
			active_user:state.user.active_user
		}
	);
}

function mapDispatchToProps( dispatch ){
	return bindActionCreators({
	

	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( SmartMenu );

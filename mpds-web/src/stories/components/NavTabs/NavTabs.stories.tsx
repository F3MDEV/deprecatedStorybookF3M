import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import NavTabs, { NavTabsProps } from "./NavTabs"
import PatientIcon from '../../utils/account-circle.svg';
import './NavTabs.scss';

export default {
  title: 'WIP/NavTabs',
  component: NavTabs,
/*   argTypes: {
    backgroundColor: { control: 'color' },
  }, */
} as Meta;

const Template: Story<NavTabsProps>= (args) => { 
  return (
    <React.Fragment>
        <NavTabs {...args} /> 
    </React.Fragment>
  )
}

export const Primary = Template.bind({});

Primary.args = {
  
  /* imageOfPatient?: any,*/
  /* hasImage: false, 
  nameOfPatient: "João Pedro",
  patientTypeDoc: "SNS",
  patientIdentification: "1234567890",
  RoomCode: "1234567890",
  BedCode: "1234567890",
  ButtonInfo: "1234567890", */
  /* nameHealthProfessional?: string,
  dateNextIntervention?: string,
  dateLastIntervention?: string,
  selectPatient? : any,
  selectIntervention? : any
 */

  /* 
  imageOfPatient?: any,
  hasImage?: boolean,
  nameOfPatient?: string,
  patientTypeDoc?: string,
  patientIdentification?: string,
  RoomCode?: string,
  BedCode?: string
  ButtonInfo?: string,
  nameHealthProfessional?: string,
  dateNextIntervention?: string,
  dateLastIntervention?: string,
  selectPatient? : any,
  selectIntervention? : any
    */
};


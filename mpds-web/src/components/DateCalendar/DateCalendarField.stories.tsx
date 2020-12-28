import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import DateCalendarField from "./DateCalendarField";
import { DateCalendarFieldProps } from './DateCalendarField';
import { useTranslation } from "react-i18next";

export default {
  title: 'Example/DateCalendarField',
  component: DateCalendarField
  /*   argTypes: {
    backgroundColor: { control: 'color' },
  }, */
} as Meta;

const { t } = useTranslation();

const Templateo: Story<DateCalendarFieldProps> = (args) => <DateCalendarField {...args} />

export const Ooo = Templateo.bind({});

Ooo.args = {
    id: 'DateFrom1',
    fullWidth: true,
    /* class: "fix-height-input-state ajust-margin-top", */
    labelText: t('WoundsFilter.From'),
    inputLabelProps: { shrink: true }
    /* valueInput={this.props.wounds.FilterDateFrom}
                onChangeInput={
                  this.handleDateChange('dateFrom')
                }
                invalidDateMessage={t('invalidDateFormat')} */
    /* 
    id={props.id}
            fullWidth = {props.fullWidth}
            className= {`text-nowrap ${props.class} `}
            format="dd.MM.yyyy"
            margin="normal"
            label={props.labelText}
            InputLabelProps={props.inputLabelProps}
            value={props.valueInput}
            onChange={props.onChangeInput}
            KeyboardButtonProps={{
                'aria-label': 'change date',
                'style':{'outline': 'none'}
            }}
            minDate={cDate}
            maxDate={props.maxDate}
            autoOk
            invalidDateMessage={props.invalidDateMessage}
    */
};


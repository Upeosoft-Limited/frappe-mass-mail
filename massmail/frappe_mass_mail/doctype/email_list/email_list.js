// Copyright (c) 2023, Karani Geoffrey and contributors
// For license information, please see license.txt

frappe.ui.form.on('Email List', {
	refresh: function(frm) {
        frm.add_custom_button(__('Send Email'), function() {
            let d = new frappe.ui.Dialog({
                title: 'Send Email to List Members',
                fields: [
					{
						label: 'List ID',
						fieldname: 'list_id',
						fieldtype: "Data",
						reqd: true,
						hidden:true,
						default: frm.doc.name
					},

					{
						label: 'Subject',
						fieldname: 'subject',
						fieldtype: "Data",
						reqd: true
					},

                    {
                        label: 'Custom Layout',
                        fieldname: 'custom_layout',
                        fieldtype: 'HTML',
                        options: `
                            <div style="display: flex;">
                                
                                <div style="width: 36%;margin-top: 0px; margin-bottom: 20px">  
                                <button type="button" class="btn btn-default btn-xs" onclick="insertFirstName()">Insert Name</button>
                                </div>
                            </div>
                        `,
                    },

                    {
                        label: 'Message',
                        fieldname: 'message',
                        fieldtype: 'Small Text',
                        reqd: true,
                    }
                ],
                primary_action_label: 'Send',
                primary_action: function(values) {
                    if(!values.message) {
                        frappe.throw('Please enter a message.');
                    }else{
						d.hide()
                        frappe.call({
                            method: 'massmail.frappe_mass_mail.services.rest.send_email',
                            args: {
                                'message': values.message,
								'list': values.list_id,
								'subject': values.subject
                            },
                            callback: function(response) {
                                d.hide()
                            }
                        });
                    }
                },
            });
            window.insertFirstName = function() {
                insertAtCursor(d.fields_dict['message'], '[first_name]');
            };

            d.show();
        });
    }
});

function insertAtCursor(field, text) {
    const value = field.get_value();
    const cursorPos = field.$input[0].selectionStart;

    const newValue = value.substring(0, cursorPos) + text + value.substring(cursorPos);

    field.set_value(newValue);
    field.set_focus();
    field.$input[0].setSelectionRange(cursorPos + text.length, cursorPos + text.length);
}
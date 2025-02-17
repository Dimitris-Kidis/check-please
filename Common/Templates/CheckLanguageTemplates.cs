using static Common.Enums.LanguageLocaleEnum;

namespace Common.Templates
{
    public static class CheckLanguageTemplates
    {
        public static string GetTemplate(LanguageLocale locale)
        {
            return locale switch
            {
                LanguageLocale.Ru => ruHtmlTemplate,
                LanguageLocale.Ro => roHtmlTemplate,
                _ => ruHtmlTemplate
            };
        }

        private static readonly string ruHtmlTemplate = @"
        <html>
        <head>
            <style>
                body { font-family: 'Arial', Courier, monospace; color: #333; }
                .header { font-size: 18px; font-weight: bold; text-align: center; margin-bottom: 20px; }
                .info-section { border: 1px solid #ccc; padding: 15px; margin-bottom: 15px; background-color: #f9f9f9; }
                .info-section strong { display: block; margin-bottom: 5px; }
                .details { margin-top: 30px; }
                table { width: 100%; border-collapse: collapse; margin-top: 10px; }
                th, td { border: 1px solid #ccc; padding: 8px; text-align: center; }
                th { background-color: #f4f4f4; }
                .total-row { font-weight: bold; }
                .medium-accent { background-color: #e0e0e0; }
                .strong-accent { background-color: #d0d0d0; }
                .signature-table { margin-top: 30px; width: 100%; text-align: center; }
                .signature-table td { border: 1px solid #ccc; padding: 10px 0; }
                .footer { text-align: right; font-size: 12px; color: #777; margin-top: 20px; }
                tr:nth-child(even) { background-color: #f9f9f9; }
                .section-header {
                    background-color: #e0e0e0 !important;
                    font-weight: bold;
                    text-align: left;
                    padding-left: 10px;
                }
                hr {
                    border: 0;
                    border-top: 1px solid #ccc;
                    margin: 20px 0;
                }
            </style>
        </head>
        <body>
            <table>
                <tr class='section-header'>
                    <td colspan='2'>Информация о клиенте</td>
                </tr>
                <tr>
                    <td><strong>Клиент</strong></td>
                    <td>{{Client.FullName}}</td>
                </tr>
                <tr>
                    <td><strong>Телефон</strong></td>
                    <td>{{Client.PhoneNumber}}</td>
                </tr>

                <tr class='section-header'>
                    <td colspan='2'>Информация о машине</td>
                </tr>
                <tr>
                    <td><strong>Номер машины</strong></td>
                    <td>{{Car.CarSign}}</td>
                </tr>
                {{#if Car.VinCode}}
                <tr>
                    <td><strong>VIN-код</strong></td>
                    <td>{{Car.VinCode}}</td>
                </tr>
                {{/if}}
                {{#if Car.Brand}}
                <tr>
                    <td><strong>Модель</strong></td>
                    <td>{{Car.Brand}} {{Car.Model}} ({{Car.Year}}, {{Car.Volume}})</td>
                </tr>
                {{/if}}
                <tr>
                    <td><strong>Пробег ({{FormatDate RepairDate}})</strong></td>
                    <td>{{Mileage}} км</td>
                </tr>
            </table>

        <hr>
    
            {{#if Details}}
            <table class='details'>
                <tr>
                    <th>Запчасть / Услуга</th>
                    <th>Цена (за шт.)</th>
                    <th>Кол-во</th>
                    <th>Общаяя цена запчасти</th>
                    <th>Стоимость работ</th>
                    <th>Общая цена</th>
                </tr>
                {{#each Details}}
                <tr>
                    <td>{{DetailName}}</td>
                    <td>{{PricePerOne}}</td>
                    <td>{{Quantity}}</td>
                    <td>{{Multiply PricePerOne Quantity}}</td>
                    <td>{{RepairPrice}}</td>
                    <td>{{Sum (Multiply PricePerOne Quantity) RepairPrice}}</td>
                </tr>
                {{/each}}
                <tr class='total-row'>
                    <td colspan='3'>Итого за запчасти:</td>
                    <td class='medium-accent'>{{TotalPartsCost}}</td>
                    <td>Итого за работу:</td>
                    <td class='medium-accent'>{{TotalRepairPrice}}</td>
                </tr>
                <tr class='total-row'>
                    <td colspan='5'><strong>Итого:</strong></td>
                    <td class='strong-accent'><strong>{{GrandTotal}}</strong></td>
                </tr>
            </table>
            {{/if}}

        <hr>

        {{#if Car.AdditionalNotes}}
        <div class='info-section'>
                <strong>Допольнительные заметки для машины</strong>
                <p>{{Car.AdditionalNotes}}</p>
        </div>
        {{/if}}
        {{#if AdditionalNotes}}
        <div class='info-section'>
                <strong>Допольнительные заметки для ремонта</strong>
                <p>{{AdditionalNotes}}</p>
        </div>
        {{/if}}

        <hr>
    
            <table class='signature-table'>
                <tr>
                    <th>Дата</th>
                    <th>Подпись клиента</th>
                    <th>Подпись мастера</th>
                </tr>
                <tr>
                    <td>{{FormatDate RepairDate}}</td>
                    <td>____________</td>
                    <td>____________</td>
                </tr>
            </table>
    
            <div class='footer'>
                Мастер: Сергей Романенко<br>
                Номер телефона: 0 (686) 999 31
            </div>
        </body>
        </html>
        ";

        private static readonly string roHtmlTemplate = @"
        <html>
        <head>
            <style>
                body { font-family: 'Arial', Courier, monospace; color: #333; }
                .header { font-size: 18px; font-weight: bold; text-align: center; margin-bottom: 20px; }
                .info-section { border: 1px solid #ccc; padding: 15px; margin-bottom: 15px; background-color: #f9f9f9; }
                .info-section strong { display: block; margin-bottom: 5px; }
                .details { margin-top: 30px; }
                table { width: 100%; border-collapse: collapse; margin-top: 10px; }
                th, td { border: 1px solid #ccc; padding: 8px; text-align: center; }
                th { background-color: #f4f4f4; }
                .total-row { font-weight: bold; }
                .medium-accent { background-color: #e0e0e0; }
                .strong-accent { background-color: #d0d0d0; }
                .signature-table { margin-top: 30px; width: 100%; text-align: center; }
                .signature-table td { border: 1px solid #ccc; padding: 10px 0; }
                .footer { text-align: right; font-size: 12px; color: #777; margin-top: 20px; }
                tr:nth-child(even) { background-color: #f9f9f9; }
                .section-header {
                    background-color: #e0e0e0 !important;
                    font-weight: bold;
                    text-align: left;
                    padding-left: 10px;
                }
                hr {
                    border: 0;
                    border-top: 1px solid #ccc;
                    margin: 20px 0;
                }
            </style>
        </head>
        <body>
            <table>
                <tr class='section-header'>
                    <td colspan='2'>Informații despre client</td>
                </tr>
                <tr>
                    <td><strong>Client</strong></td>
                    <td>{{Client.FullName}}</td>
                </tr>
                <tr>
                    <td><strong>Telefon</strong></td>
                    <td>{{Client.PhoneNumber}}</td>
                </tr>

                <tr class='section-header'>
                    <td colspan='2'>Informații despre mașină</td>
                </tr>
                <tr>
                    <td><strong>Număr mașină</strong></td>
                    <td>{{Car.CarSign}}</td>
                </tr>
                {{#if Car.VinCode}}
                <tr>
                    <td><strong>Cod VIN</strong></td>
                    <td>{{Car.VinCode}}</td>
                </tr>
                {{/if}}
                {{#if Car.Brand}}
                <tr>
                    <td><strong>Model</strong></td>
                    <td>{{Car.Brand}} {{Car.Model}} ({{Car.Year}}, {{Car.Volume}})</td>
                </tr>
                {{/if}}
                <tr>
                    <td><strong>Kilometraj ({{FormatDate RepairDate}})</strong></td>
                    <td>{{Mileage}} km</td>
                </tr>
            </table>

        <hr>
    
            {{#if Details}}
            <table class='details'>
                <tr>
                    <th>Piesă / Serviciu</th>
                    <th>Preț (pe bucată)</th>
                    <th>Cantitate</th>
                    <th>Preț total piesă</th>
                    <th>Cost manoperă</th>
                    <th>Preț total</th>
                </tr>
                {{#each Details}}
                <tr>
                    <td>{{DetailName}}</td>
                    <td>{{PricePerOne}}</td>
                    <td>{{Quantity}}</td>
                    <td>{{Multiply PricePerOne Quantity}}</td>
                    <td>{{RepairPrice}}</td>
                    <td>{{Sum (Multiply PricePerOne Quantity) RepairPrice}}</td>
                </tr>
                {{/each}}
                <tr class='total-row'>
                    <td colspan='3'>Total piese:</td>
                    <td class='medium-accent'>{{TotalPartsCost}}</td>
                    <td>Total manoperă:</td>
                    <td class='medium-accent'>{{TotalRepairPrice}}</td>
                </tr>
                <tr class='total-row'>
                    <td colspan='5'><strong>Total:</strong></td>
                    <td class='strong-accent'><strong>{{GrandTotal}}</strong></td>
                </tr>
            </table>
            {{/if}}

        <hr>

        {{#if Car.AdditionalNotes}}
        <div class='info-section'>
                <strong>Note suplimentare pentru mașină</strong>
                <p>{{Car.AdditionalNotes}}</p>
        </div>
        {{/if}}
        {{#if AdditionalNotes}}
        <div class='info-section'>
                <strong>Note suplimentare pentru reparație</strong>
                <p>{{AdditionalNotes}}</p>
        </div>
        {{/if}}

        <hr>
    
            <table class='signature-table'>
                <tr>
                    <th>Data</th>
                    <th>Semnătura clientului</th>
                    <th>Semnătura mecanicului</th>
                </tr>
                <tr>
                    <td>{{FormatDate RepairDate}}</td>
                    <td>____________</td>
                    <td>____________</td>
                </tr>
            </table>
    
            <div class='footer'>
                Mecanic: Serghei Romanenko<br>
                Număr de telefon: 0 (686) 999 31
            </div>
        </body>
        </html>
        ";
    }
}

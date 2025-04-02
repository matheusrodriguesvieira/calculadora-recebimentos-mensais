export default function Resultados({ resultados }) {
  return (
    <>
      <h1>Visão Geral</h1>
      <div className="results-container">
        <div className="session-container">
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Valor</th>
                  <th>Impostos Federais</th>
                  <th>Total sem Impostos</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Salario Bruto Total</td>
                  <td>R${resultados.salario.salarioBruto}</td>
                  <td>R${resultados.salario.impostosFederais}</td>
                  <td>R${resultados.salario.salarioLiquido}</td>
                </tr>
                <tr>
                  <td>Férias</td>
                  <td>R${resultados.ferias.feriasBruto}</td>
                  <td>R${resultados.ferias.ImpostosFerias}</td>
                  <td>R${resultados.ferias.feriasLiquido}</td>
                </tr>
                <tr>
                  <td>Participação nos Lucros</td>
                  <td>R${resultados.plr.PLRBruto}</td>
                  <td>R${resultados.plr.impostosPLR}</td>
                  <td>R${resultados.plr.PLRLíquido}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="session-container">
          <label>Outros Benefícios</label>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Total anual</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Cartão alimentação</td>
                  <td>R${resultados.cartaoAlimentacao}</td>
                </tr>
                <tr>
                  <td>Previdencia Privada</td>
                  <td>R${resultados.previdenciaPrivadaBruto}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="session-container">
          <label>Totais</label>
          {/* <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Antes de Impostos</th>
                  <th>Líquido</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Média Mensal</td>
                  <td>
                    {parseFloat(
                      (
                        (resultados.salario.salarioBruto +
                          resultados.cartaoAlimentacao +
                          resultados.previdenciaPrivadaBruto) /
                        12
                      ).toFixed(2)
                    )}
                  </td>
                  <td>
                    {parseFloat(
                      (
                        (resultados.salario.salarioLiquido +
                          resultados.cartaoAlimentacao +
                          resultados.previdenciaPrivadaBruto) /
                        12
                      ).toFixed(2)
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div> */}
          <p>
            Você recebe uma média de <b>R${parseFloat(((resultados.salario.salarioBruto + resultados.cartaoAlimentacao + resultados.previdenciaPrivadaBruto) / 12).toFixed(2))}/Mês</b> antes de impostos. Deduzindo os impostos o valor vai para <b>R${parseFloat(((resultados.salario.salarioLiquido + resultados.cartaoAlimentacao + resultados.previdenciaPrivadaBruto) / 12).toFixed(2))}/Mês</b>
          </p>
        </div>
      </div>
    </>
  );
}

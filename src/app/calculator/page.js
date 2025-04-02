"use client";

import { useState } from "react";
import "./index.css";
import Resultados from "@/components/Resultados";
import Link from "next/link";

export default function Calculator() {
  const [salarioBruto, setSalarioBruto] = useState("");
  const [decimoSalarioBruto, setDecimoSalarioBruto] = useState(true);
  const [multiplicadorPLR, setMultiplicadorPLR] = useState("");
  const [porcentagemPrevidencia, setPorcentagemPrevidencia] = useState("");
  const [cartaoAlimentacao, setCartaoAlimentacao] = useState("");
  const [decimoCartaoAlimentacao, setDecimoCartaoAlimentacao] = useState(true);
  const [resultados, setResultados] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    const descontoINSS = calcularINSS(salarioBruto);
    const descontoIRPF = calcularIRPF(salarioBruto, descontoINSS);
    const totalImpostos = descontoINSS + descontoIRPF;
    const salarioLiquido = salarioBruto - totalImpostos;

    const feriasBruto = calcularFerias(salarioBruto);
    const feriasINSS = calcularINSS(feriasBruto);
    const feriasIRPF = calcularIRPF(feriasBruto, feriasINSS);
    const ImpostosFerias = feriasINSS + feriasIRPF;
    const feriasLiquido = feriasBruto - ImpostosFerias;

    const PLRBruto = salarioBruto * multiplicadorPLR;
    const impostosPLR = calcularPLR(PLRBruto);
    const PLRLíquido = PLRBruto - impostosPLR;

    const previdenciaPrivadaBruto =
      salarioBruto * (porcentagemPrevidencia / 100);

    const multiplicadorSalario = decimoSalarioBruto ? 12 : 11;
    const multiplicadorCartaoAlimentacao = decimoCartaoAlimentacao ? 13 : 12;

    const resultado = {
      salario: {
        salarioBruto: parseFloat(
          (salarioBruto * multiplicadorSalario).toFixed(2)
        ),
        salarioLiquido: parseFloat(
          (salarioLiquido * multiplicadorSalario).toFixed(2)
        ),
        impostosFederais: parseFloat(
          (totalImpostos * multiplicadorSalario).toFixed(2)
        ),
      },
      ferias: {
        feriasBruto: parseFloat(feriasBruto.toFixed(2)),
        feriasLiquido: parseFloat(feriasLiquido.toFixed(2)),
        ImpostosFerias: parseFloat(ImpostosFerias.toFixed(2)),
      },
      cartaoAlimentacao: parseFloat(
        (cartaoAlimentacao * multiplicadorCartaoAlimentacao).toFixed(2)
      ),
      plr: {
        PLRBruto: parseFloat(PLRBruto.toFixed(2)),
        PLRLíquido: parseFloat(PLRLíquido.toFixed(2)),
        impostosPLR: parseFloat(impostosPLR.toFixed(2)),
      },
      previdenciaPrivadaBruto: parseFloat(
        (previdenciaPrivadaBruto * 11).toFixed(2)
      ),
    };

    setResultados(resultado);
    // console.log(resultados)
  }

  function calcularFerias(valor) {
    valor = parseInt(valor);
    let resultado = valor + (valor * 1) / 3;
    // console.log('resultado')
    // console.log(resultado)
    return resultado;
  }

  function calcularINSS(valor) {
    let resultado = 0;
    if (valor > 4000.03) {
      resultado = (valor - 4000.03) * 0.14 + 105.9 + 112.92 + 160.0;
    } else if (valor > 2666.68) {
      resultado = (4000.03 - valor) * 0.12 + 105.9 + 112.92;
    } else if (valor > 1412) {
      resultado = (2666.68 - valor) * 0.09 + 105.9;
    } else {
      resultado = valor * 0.07;
    }
    // console.log(resultado);

    return resultado;
  }

  function calcularIRPF(salario, INSS) {
    let resultado = 0;
    let valor = salario - INSS;
    if (valor > 4664.68) {
      resultado = valor * 0.275 - 896;
    } else if (valor > 3751.05) {
      resultado = valor * 0.225 - 662.77;
    } else if (valor > 2826.65) {
      resultado = valor * 0.15 - 381.44;
    } else if (valor > 2259.2) {
      resultado = valor * 0.075 - 169.44;
    } else {
      resultado = 0;
    }
    // console.log(resultado);

    return resultado;
  }

  function calcularPLR(valor) {
    let resultado = 0;
    if (valor > 16380.38) {
      resultado = valor * 0.275 - 3173.78;
    } else if (valor > 13167.0) {
      resultado = valor * 0.225 - 2304.76;
    } else if (valor > 9922.28) {
      // console.log('valor a deduzir');
      // console.log(valor);
      resultado = valor * 0.15 - 1317.23;
      // console.log(resultado);
    } else if (valor > 7640.8) {
      resultado = valor * 0.075 - 573.03;
    } else {
      resultado = valor;
    }

    return resultado;
  }

  return (
    <div className="container">
      <div className="left-container">
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Salário bruto</legend>
            <div className="form-group">
              <div className="input-group">
                <label htmlFor="previdencia-privada">Salário bruto</label>
                <input
                  type="number"
                  id="salario-bruto"
                  name="salario-bruto"
                  required
                  value={salarioBruto}
                  onChange={(e) => setSalarioBruto(e.target.value)}
                  placeholder="Exemplo: R$1000"
                />
              </div>
              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="decimoTerceiro"
                  name="decimoTerceiro"
                  checked={decimoSalarioBruto}
                  onChange={(e) => setDecimoSalarioBruto(e.target.checked)}
                />
                <label htmlFor="decimoTerceiro">Décimo terceiro?</label>
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>Participação nos lucros e Resultados</legend>
            <div className="form-group">
              {/* <div className="input-group">
                <label htmlFor="plr">Salario Base</label>
                <input type="number" id="plr" name="plr" required />
              </div> */}
              <div className="input-group">
                <label htmlFor="multiplicador">Multiplicador</label>
                <input
                  type="number"
                  id="multiplicador"
                  name="multiplicador"
                  value={multiplicadorPLR}
                  min={0.0}
                  max={5.00}
                  onChange={(e) => setMultiplicadorPLR(e.target.value)}
                  required
                  placeholder="Mínimo 0 e Máximo 5"
                />
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>Outros proventos</legend>
            <div className="form-group">
              {/* <div className="input-group">
                <label htmlFor="previdencia-privada">Previdência privada</label>
                <input
                  type="number"
                  id="previdencia-privada"
                  name="previdencia-privada"
                  required
                />
              </div> */}
              <div className="input-group">
                <label htmlFor="porcentagem">Previdencia Privada (%)</label>
                <input
                  type="number"
                  id="porcentagem"
                  name="porcentagem"
                  value={porcentagemPrevidencia}
                  placeholder="Exemplo: 2%"
                  min={0}
                  max={100}
                  onChange={(e) => setPorcentagemPrevidencia(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <div className="input-group">
                <label htmlFor="cartao-alimentacao">Cartão alimentação</label>
                <input
                  type="number"
                  id="cartao-alimentacao"
                  name="cartao-alimentacao"
                  value={cartaoAlimentacao}
                  onChange={(e) => setCartaoAlimentacao(e.target.value)}
                  placeholder="Exemplo: R$1000"
                  required
                />
              </div>
              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="decimoTerceiro"
                  name="decimoTerceiro"
                  checked={decimoCartaoAlimentacao}
                  onChange={(e) => setDecimoCartaoAlimentacao(e.target.checked)}
                />
                <label htmlFor="decimoTerceiro">Décimo terceiro?</label>
              </div>
            </div>
          </fieldset>

          <div className="buttons-container">
            <Link className="btn" href={'/'}>Voltar</Link>
            <button className='btn' type="submit">Calcular</button>
          </div>
        </form>
      </div>

      <div className="right-container">
        {resultados && <Resultados resultados={resultados} />}
      </div>
    </div>
  );
}

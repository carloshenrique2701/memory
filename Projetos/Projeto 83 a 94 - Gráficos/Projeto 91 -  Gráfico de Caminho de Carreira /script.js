document.addEventListener('DOMContentLoaded', function () {
    
    const etapasCarreiras = [

        {titulo: 'Nível 0', min: 0, max: 9},
        {titulo: 'Nível 1', min: 10, max: 19},
        {titulo: 'Nível 2', min: 20, max: 29},
        {titulo: 'Nível 3', min: 30, max: 39},
        {titulo: 'Nível 4', min: 40, max: 49},
        {titulo: 'Nível 5', min: 50, max: 59},
        {titulo: 'Nível 6', min: 60, max: 69},
        {titulo: 'Nível 7', min: 70, max: 79},
        {titulo: 'Nível 8', min: 80, max: 89},
        {titulo: 'Nível 9', min: 90, max: 99},
        {titulo: 'Nível 10', min: 100, max: 110}

    ];

    const graficoBarras = document.getElementById("graficoBarras")

    const seletorVendedor = document.getElementById('seletorVendedor');

    const detalhesVendedor = document.getElementById('detalhesVendedor');

    fetch('dados.xlsx')
        .then(res => res.arrayBuffer())
        .then(data => {

            const wb = XLSX.read(data, {header: 1});

            const ws = wb.Sheets[wb.SheetNames[0]];

            const dadosJson = XLSX.utils.sheet_to_json(ws);

            dadosJson.forEach(item => {
                
                var option = this.createElement('option');

                option.value = item['Vendedor'];
                option.textContent = item['Vendedor'];
                
                seletorVendedor.appendChild(option)

            });

            seletorVendedor.addEventListener('change', function () {
               
                var vendedorSelecionado = this.value;

                var dadosVendedor = dadosJson.find(item => item['Vendedor'] === vendedorSelecionado);

                if(dadosVendedor) atualizarGrafico(dadosVendedor);

            });

            if(dadosJson.length > 0){

                seletorVendedor.value = dadosJson[0]['Vendedor'];

                atualizarGrafico(dadosJson[0])

            }

        })
    .catch(erro => console.error('Erro ao carregar o arquivo: ', erro));

    function atualizarGrafico(dadosVendedor) {

        graficoBarras.innerHTML = '';
        
        let vendas = dadosVendedor['Vendas'];

        etapasCarreiras.forEach(etapa => {

            const divBarra = document.createElement('div');

            divBarra.className = 'barra';

            divBarra.style.height = `${etapa.max}%`;

            const label = document.createElement('div');

            label.className = 'label';

            label.innerHTML = `${etapa.titulo}`;

            divBarra.appendChild(label);

            if (vendas >= 100) {
                
                vendas = 100;

            }

            if(vendas >= etapa.min && vendas <= etapa.max){

                divBarra.classList.add('vendedor');

                const img = document.createElement('img');

                img.src = 'vendedor.png';

                img.alt = dadosVendedor['Vendedor'];

                img.style.position = 'absolute';

                img.style.bottom = '100%';

                img.style.left = '50%';

                img.style.transform = 'translateX(-50%)';

                divBarra.style.position = 'relative';

                divBarra.appendChild(img);

            }

            graficoBarras.appendChild(divBarra);

        });

        detalhesVendedor.innerHTML = `<span>Vendedor: ${dadosVendedor['Vendedor']}</span><span>Total de Vendas: ${dadosVendedor['Vendas']}</span>`;

    }

});
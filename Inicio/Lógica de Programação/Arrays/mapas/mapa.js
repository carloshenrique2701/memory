let notas = new Map();

notas.set('João', 5);
notas.set('Nathan', 8.5);
notas.set('Vilma', 7);
notas.set('Ana', 2);
notas.set('Thamirez', 10);

console.log('Notas dos alunos:')

notas.forEach((nota, aluno)=>{
    console.log(`|${aluno}: ${nota.toFixed(1)};`)
});

console.log('          ');
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
console.log('          ');


notas.set('Ana', 8);

console.log('Nota atualizada da ana: ', notas.get('Ana'));


console.log('          ');
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
console.log('          ');


let aluno = 'Victor';

if(notas.has(aluno)){
    console.log(`${aluno} está na lista.`);
} else{
    console.log(`${aluno} não está na lista.`);
}


console.log('          ');
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
console.log('          ');


notas.delete('Ana');

console.log('Notas dos alunos(atualizada):')

notas.forEach((nota, aluno)=>{
    console.log(`|${aluno}: ${nota.toFixed(1)};`)
});


console.log('          ');
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
console.log('          ');


console.log('Número de alunos que estão listados: ', notas.size);

notas.clear();

console.log('\nLista limpa... Número de alunos listados: ', notas.size);


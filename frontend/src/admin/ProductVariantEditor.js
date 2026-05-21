import React from 'react';

export default function ProductVariantEditor({ variants, setVariants }) {
  const addVariant = () => setVariants([...variants, { name: '', price: 0, options: [] }]);

  const updateVariant = (idx, key, value) => {
    const upd = [...variants];
    upd[idx][key] = value;
    setVariants(upd);
  };

  const addOption = (vIdx) => {
    const upd = [...variants];
    upd[vIdx].options = [...(upd[vIdx].options || []), { key: '', value: '' }];
    setVariants(upd);
  };

  const updateOption = (vIdx, oIdx, key, value) => {
    const upd = [...variants];
    upd[vIdx].options[oIdx][key] = value;
    setVariants(upd);
  };

  return (
    <div>
      <h4>Variants</h4>
      {variants.map((v, vIdx) => (
        <div key={vIdx} style={{ border: '1px solid #ccc', marginBottom: 8, padding: 8 }}>
          <input placeholder="Variant Name" value={v.name} onChange={e => updateVariant(vIdx, 'name', e.target.value)} />
          <input placeholder="Price" type="number" value={v.price} onChange={e => updateVariant(vIdx, 'price', e.target.value)} />
          <button onClick={() => addOption(vIdx)}>Add Option</button>
          {v.options && v.options.map((o, oIdx) => (
            <div key={oIdx}>
              <input placeholder="Option Key" value={o.key} onChange={e => updateOption(vIdx, oIdx, 'key', e.target.value)} />
              <input placeholder="Option Value" value={o.value} onChange={e => updateOption(vIdx, oIdx, 'value', e.target.value)} />
            </div>
          ))}
        </div>
      ))}
      <button onClick={addVariant}>Add Variant</button>
    </div>
  );
}